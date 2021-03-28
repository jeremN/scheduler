import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import DatePicker, { setDefaultLocale } from 'react-datepicker';

import Loader from '../../atoms/Loader/Loader';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Buttons/Buttons';
import Input from '../../atoms/Input/Input';
import SelectInput from '../../atoms/SelectInput/SelectInput';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import ErrorMessage from '../../molecules/ErrorMessage/ErrorMessage';
import PlanningsList from '../../organisms/PlanningsList/PlanningsList';

import { useAuth, useClient } from '../../../context/authContext';
import { useAsync } from '../../../hooks/useAsync';
import {
  addDays,
  getTimeOnly,
  dateFormatting,
} from '../../../utilities/utilities';

import 'react-datepicker/dist/react-datepicker.css';
import './Plannings.scss';

setDefaultLocale('fr');

const Plannings = () => {
  const currentDate = new Date();
  const currentDatePlusSevenDays = addDays(currentDate, 6);
  const client = useClient();
  const {
    user: { teams },
  } = useAuth();
  const { run, isError, isLoading, error } = useAsync();
  const history = useHistory();

  const initialFormState = {
    title: '',
    team: '',
    startDate: currentDate,
    endDate: currentDatePlusSevenDays,
    startHours: '',
    endHours: '',
  };

  const [planningsList, setplanningsList] = useState([]);
  const [state, setState] = useState(initialFormState);

  const handleChange = (event, fieldName = null, fieldValue = null) => {
    let currentValue = event?.target.value ?? fieldValue;
    let currentName = event?.target.name ?? fieldName;

    setState({
      ...state,
      [currentName]: currentValue,
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
        history.push(`/plannings/edit/${datas.planningID}`);
      } else {
        throw new Error(
          'An error occured while trying to create your planning, please try again'
        );
      }
    });
  };

  useEffect(() => {
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
  }, [client, run]);

  const { title, team, startDate, endDate, startHours, endHours } = state;

  function deletePlanning(evt, planningId) {
    evt.preventDefault();

    run(
      client(`plannings/deletePlanning/${planningId}`, {
        method: 'DELETE',
      })
    ).then(async (result) => {
      const datas = await result;

      if (datas.delete) {
        const currentList = [...planningsList];
        const updatedList = currentList.filter(
          (element) => element._id !== planningId
        );
        setplanningsList(updatedList);
      }
    });
  }

  function duplicatePlanning(evt, planningID) {
    evt.preventDefault();

    run(
      client('plannings/duplicate', {
        body: { planningID },
      })
    ).then(async (result) => {
      const datas = await result;

      if (datas.newID) {
        const duplicatedPlanning = [...planningsList].find(
          (element) => element._id === planningID
        );

        const newPlanning = {
          ...duplicatedPlanning,
          _id: datas.newID,
        };
        const updatedList = [...planningsList, newPlanning];
        setplanningsList(updatedList);
      }
    });
  }

  return (
    <main>
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
              <SelectInput
                id={`planningShop`}
                name={'team'}
                value={team}
                optionsArray={[
                  { wording: 'choisir une équipe', value: '' },
                  ...teams.map(({ name, _id }) => ({
                    wording: name,
                    value: _id,
                  })),
                ]}
                onChangeFn={handleChange}
              />
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
          <PlanningsList
            onDelete={deletePlanning}
            onDuplicate={duplicatePlanning}
            planningsList={planningsList}
          />
        </Card>
        {isLoading ? <Loader /> : null}
        {isError ? <ErrorMessage error={error} /> : null}
      </div>
    </main>
  );
};

export default Plannings;
