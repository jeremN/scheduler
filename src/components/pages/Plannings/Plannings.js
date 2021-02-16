import React, {
  Fragment,
  useReducer,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

import DatePicker from 'react-datepicker';

import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Buttons/Buttons';
import Input from '../../atoms/Input/Input';
import FormGroup from '../../molecules/FormGroup/FormGroup';

import { useClient } from '../../../context/authContext';
import { useAsync } from '../../../hooks/useAsync';

import 'react-datepicker/dist/react-datepicker.css';
import './Plannings.scss';

const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const getTimeOnly = (date) => {
  let time = new Date(date);
  return moment(time).format('HH:mm:ss');
};

const dateFormatting = (date) => {
  const currentDate = new Date(date);
  return moment(currentDate).format('DD/MM/YYYY');
};

const Plannings = (props) => {
  const currentDate = new Date();
  const currentDatePlusSevenDays = addDays(currentDate, 6);
  const client = useClient();
  const { run, isError, isLoading } = useAsync();

  const initialFormState = {
    title: '',
    team: '',
    startDate: currentDate,
    endDate: currentDatePlusSevenDays,
    startHours: '',
    endHours: '',
  };

  const [planningsList, setplanningsList] = useState([]);
  const [planningId, setPlanningId] = useState(null);
  const [state, setState] = useState(initialFormState);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const newPlanning = {
      ...state,
      startHours: getTimeOnly(state.startHours),
      endHours: getTimeOnly(state.endHours),
      startDate: dateFormatting(state.startDate),
      endDate: dateFormatting(state.endDate),
      status: 'wip',
    };

    run(
      client('plannings/newPlanning', {
        body: { newPlanning },
      })
    ).then(async (result) => {
      const datas = await result;

      if (datas.planningID) {
        setPlanningId(datas.planningID);
      } else {
        throw new Error(
          'An error occured while trying to create your planning, please try again'
        );
      }
    });
  };

  useEffect(() => {
    async function fetchListOfPlannings() {
      run(client('plannings/planningsList')).then(async (result) => {
        const { planningsList } = await result;
        if (planningsList) {
          setplanningsList(planningsList);
        } else {
          throw new Error(
            'An error occured while trying to get plannings list, please try again'
          );
        }
      });
    }
    fetchListOfPlannings();
  }, []);

  const { title, shop, startDate, endDate, startHours, endHours } = state;

  const plannings = useMemo(() => {
    const handleDelete = (evt, planningID) => {
      evt.preventDefault();
      const url = `${process.env.REACT_APP_API_ENDPOINT}/plannings/deletePlanning/${planningID}`;
      run;
      fetch(url, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          // TODO display response message
          const currentList = [...planningsList];
          const updatedList = currentList.filter(
            (element) => element._id !== planningID
          );
          setplanningsList(updatedList);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handleDuplicate = (evt, planningID) => {
      evt.preventDefault();
      const url = `${process.env.REACT_APP_API_ENDPOINT}/plannings/duplicate`;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const currentList = [...planningsList];
      const duplicatedPlanning = currentList.find(
        (element) => element._id === planningID
      );

      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ planningID: planningID }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          const newPlanning = {
            ...duplicatedPlanning,
            _id: result.newID,
          };
          const updatedList = [...currentList, newPlanning];
          setplanningsList(updatedList);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return (
      <ul className="plannings__list">
        <li className="plannings__item">
          <span className="plannings__itemTitle">Titre</span>
          <span className="plannings__itemShop">Equipe</span>
          <span className="plannings__itemDates">
            Du <br /> Au
          </span>
          <span className="plannings__itemHours">Heures</span>
          <span className="plannings__itemStatus">Status</span>
          <span className="plannings__itemActions"></span>
        </li>
        {planningsList.map((planning, index) => (
          <li key={planning._id} className="plannings__item">
            <span className="plannings__itemTitle">{planning.title}</span>
            <span className="plannings__itemShop">{planning.shop}</span>
            <span className="plannings__itemDates">
              {planning.startDate} <br /> {planning.endDate}
            </span>
            <span className="plannings__itemHours">
              {planning.startHours} - {planning.endHours}
            </span>
            <span className="plannings__itemStatus">{planning.status}</span>
            <span className="plannings__itemActions">
              <Link to={`/plannings/edit/${planning._id}`}>Editer</Link>
              <Button clicked={(evt) => handleDelete(evt, planning._id)}>
                Supprimer
              </Button>
              <Button clicked={(evt) => handleDuplicate(evt, planning._id)}>
                Dupliquer
              </Button>
            </span>
          </li>
        ))}
      </ul>
    );
  }, [planningsList]);

  return (
    <Fragment>
      {planningId ? <Redirect to={`/plannings/edit/${planningId}`} /> : null}
      <div className="plannings">
        <Card modifiers={['primary']} classes={['card__item--1']}>
          <h3>Créer un planning</h3>
          <form className="form" onSubmit={handleSubmit}>
            <FormGroup
              labelId="planningName"
              wording="Titre du planning"
              isRequired={true}
              modifiers={['column']}>
              <Input
                id="planningName"
                type="text"
                name="title"
                value={title}
                onChangeFn={handleChange}
              />
            </FormGroup>
            <FormGroup
              labelId="planningShop"
              wording="Magasin"
              isRequired={true}
              modifiers={['column']}>
              <select
                id="planningShop"
                className="form__field"
                type="text"
                name="shop"
                value={shop}
                onChange={handleChange}>
                <option value="none">Choisir un magasin</option>
                <option value="aubergenville">Aubergenville</option>
                <option value="plaisir">Plaisir</option>
              </select>
            </FormGroup>
            <div className="form__inline customDates">
              <FormGroup
                labelId="planningStartDate"
                wording="Date de début"
                isRequired={true}
                modifiers={['column']}>
                <DatePicker
                  id="planningStartDate"
                  className="form__field"
                  name="startDate"
                  selected={startDate}
                  onChange={(date) => handleChange(null, 'startDate', date)}
                  startDate={startDate}
                  dateFormat="dd/MM/yyyy"
                />
              </FormGroup>
              <FormGroup
                labelId="planningEndDate"
                wording="Date de fin"
                isRequired={true}
                modifiers={['column']}>
                <DatePicker
                  id="planningEndDate"
                  className="form__field"
                  name="endDate"
                  selected={endDate}
                  onChange={(date) => handleChange(null, 'endDate', date)}
                  startDate={endDate}
                  dateFormat="dd/MM/yyyy"
                />
              </FormGroup>
            </div>
            <div className="form__inline customHours">
              <FormGroup
                labelId="planningStartHour"
                wording="Heures de début"
                isRequired={true}
                modifiers={['column']}>
                <DatePicker
                  id="planningStartHour"
                  className="form__field"
                  name="startHour"
                  selected={startHours}
                  showTimeSelect
                  showTimeSelectOnly
                  onChange={(date) => handleChange(null, 'startHours', date)}
                  dateFormat="hh:mm"
                />
              </FormGroup>
              <FormGroup
                labelId="planningEndHour"
                wording="Heures de fin"
                isRequired={true}
                modifiers={['column']}>
                <DatePicker
                  id="planningEndHour"
                  className="form__field"
                  name="endHour"
                  selected={endHours}
                  showTimeSelect
                  showTimeSelectOnly
                  onChange={(date) => handleChange(null, 'endHours', date)}
                  dateFormat="hh:mm"
                />
              </FormGroup>
            </div>
            <Button modifiers={['primary']} type="submit">
              Créer mon planning
            </Button>
          </form>
        </Card>
        <Card classes={['card__item--2']}>
          <h3>Mes derniers plannings</h3>
          <p className="subtitle">
            Seuls les {planningsList.length} derniers plannings sont affichés
          </p>
          {plannings}
        </Card>
      </div>
    </Fragment>
  );
};

export default Plannings;
