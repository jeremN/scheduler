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

import 'react-datepicker/dist/react-datepicker.css';
import './Plannings.scss';

const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const getTimeOnly = (date) => {
  let time = new Date(date);
  return moment(time).format('HH:mm:ss');
}

const dateFormatting = (date) => {
  const currentDate = new Date(date);
  return moment(currentDate).format('DD/MM/YYYY');
}

const Plannings = props => {
  const currentDate = new Date();
  const currentDatePlusSevenDays = addDays(currentDate, 6);

  // TODO => replace shop by team (when team page will be available)
  const formState = {
    title: '',
    shop: 'none',
    startDate: currentDate,
    endDate: currentDatePlusSevenDays,
    startHours: '',
    endHours: ''
  }

  const formReducer = (state, { field, value }) => {
    return {
      ...state, 
      [field]: value
    }
  }

  const [planningsList, setplanningsList] = useState([]);
  const [planningId, setPlanningId] = useState(null);
  const [state, setState] = useReducer(formReducer, formState);

  const handleChange = (e, field = null, val = null) => {
    setState({
      field: field ? field : e.target.name,
      value: val ? val : e.target.value
    })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    // TODO Form validation

    const dataToSend = {
      ...state,
      startHours: getTimeOnly(state.startHours),
      endHours: getTimeOnly(state.endHours),
      startDate: dateFormatting(state.startDate),
      endDate: dateFormatting(state.endDate),
      status: 'wip'
    }

    const url = `${process.env.REACT_APP_API_ENDPOINT}/plannings/newPlanning`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ newPlanning: dataToSend })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((result) => {
        setPlanningId(result.planningID);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    async function fetchListOfPlannings () {    
      const url = `${process.env.REACT_APP_API_ENDPOINT}/plannings/planningsList`;
      fetch(url,{
        method: 'GET'
      })
        .then(response => response.json())
        .then(
          (result) => {
            setplanningsList(result.planningsList);
          },
          (error) => {
            console.error('GET plannings list error', error);
          }
        )
    };
    fetchListOfPlannings();
  }, []);

  const {
    title,
    shop,
    startDate,
    endDate,
    startHours,
    endHours,
  } = state;

  const plannings = useMemo(() => {
    const handleDelete =  (evt, planningID) => {
      evt.preventDefault();
      const url = `${process.env.REACT_APP_API_ENDPOINT}/plannings/deletePlanning/${planningID}`;

      fetch(url, {
        method: 'DELETE'
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          // TODO display response message
          const currentList = [...planningsList];
          const updatedList = currentList.filter((element) => element._id !== planningID)
          setplanningsList(updatedList);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    return (
      <ul className="plannings__list">
        <li className="plannings__item">
          <span className="plannings__itemTitle">Titre</span>
          <span className="plannings__itemShop">Equipe</span>
          <span className="plannings__itemDates">Du <br /> Au</span>
          <span className="plannings__itemHours">Heures</span>
          <span className="plannings__itemStatus">Status</span>
          <span className="plannings__itemActions"></span>
        </li>
        { planningsList.map((planning, index) => (
          <li key={ planning._id } className="plannings__item">
            <span className="plannings__itemTitle">{ planning.title }</span>
            <span className="plannings__itemShop">{ planning.shop }</span>
            <span className="plannings__itemDates">{ planning.startDate } <br /> { planning.endDate }</span>
            <span className="plannings__itemHours">{ planning.startHours } - { planning.endHours }</span>
            <span className="plannings__itemStatus">{ planning.status }</span>
            <span className="plannings__itemActions">
              <Link to={`/plannings/edit/${planning._id}`}>Editer</Link>
              <Button clicked={ (evt) => handleDelete(evt, planning._id) }>Supprimer</Button>
              <Button>Dupliquer</Button>
            </span>
          </li>
        )) }
      </ul>
    );
  }, [planningsList]);

  return (
    <Fragment>
      {planningId ? <Redirect to={ `/plannings/edit/${planningId}` } /> : null }
      <div className="plannings">
        <Card modifiers={ ['primary'] } classes={ ['card__item--1'] }>
          <h3>Créer un planning</h3>
          <form className="form" onSubmit={ handleSubmit }>
            <FormGroup 
              labelId="planningName"
              wording="Titre du planning"
              isRequired={ true }
              modifiers={ ['column'] }>          
              <Input
                id="planningName"
                type="text"
                name="title"
                value={ title }
                onChangeFn={ handleChange } />
            </FormGroup>
            <FormGroup 
              labelId="planningShop"
              wording="Magasin"
              isRequired={ true }
              modifiers={ ['column'] }>          
              <select
                id="planningShop"
                className="form__field"
                type="text" 
                name="shop"
                value={ shop }
                onChange={ handleChange } >
                <option value="none">Choisir un magasin</option>
                <option value="aubergenville">Aubergenville</option>
                <option value="plaisir">Plaisir</option>
              </select>
            </FormGroup>
            <div className="form__inline customDates">
              <FormGroup 
                labelId="planningStartDate"
                wording="Date de début"
                isRequired={ true }
                modifiers={ ['column'] }>          
                <DatePicker 
                  id="planningStartDate"
                  className="form__field"
                  name="startDate" 
                  selected={ startDate }
                  onChange={ date => handleChange(null, 'startDate', date) }
                  startDate={ startDate }
                  dateFormat="dd/MM/yyyy" />
              </FormGroup>
              <FormGroup 
                labelId="planningEndDate"
                wording="Date de fin"
                isRequired={ true }
                modifiers={ ['column'] }>          
                <DatePicker 
                  id="planningEndDate"
                  className="form__field" 
                  name="endDate" 
                  selected={ endDate }
                  onChange={ date => handleChange(null, 'endDate', date) }
                  startDate={ endDate }
                  dateFormat="dd/MM/yyyy" />
              </FormGroup>
            </div> 
            <div className="form__inline customHours">
              <FormGroup 
                labelId="planningStartHour"
                wording="Heures de début"
                isRequired={ true }
                modifiers={ ['column'] }>          
                <DatePicker 
                  id="planningStartHour"
                  className="form__field" 
                  name="startHour" 
                  selected={ startHours }
                  showTimeSelect
                  showTimeSelectOnly
                  onChange={ date => handleChange(null, 'startHours', date) }
                  dateFormat="hh:mm" />
              </FormGroup>
              <FormGroup 
                labelId="planningEndHour"
                wording="Heures de fin"
                isRequired={ true }
                modifiers={ ['column'] }>          
                <DatePicker 
                  id="planningEndHour"
                  className="form__field" 
                  name="endHour" 
                  selected={ endHours }
                  showTimeSelect
                  showTimeSelectOnly
                  onChange={ date => handleChange(null, 'endHours', date) }
                  dateFormat="hh:mm" />
              </FormGroup>
            </div> 
            <Button modifiers={ ['primary'] } type="submit" >
              Créer mon planning
            </Button>
          </form>
        </Card>
        <Card classes={ ['card__item--2'] }>
          <h3>Mes derniers plannings</h3>
          <p className="subtitle">Seuls les { planningsList.length } derniers plannings sont affichés</p>
          { plannings }
        </Card>
      </div>
    </Fragment>
  );
};

export default Plannings;
