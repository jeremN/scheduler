import React, { 
  Fragment,
  useReducer,
  useState,
  useMemo
} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setNewPlanning } from '../../../store/actions';

import DatePicker from 'react-datepicker';

import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Buttons/Buttons';
import Input from '../../atoms/Input/Input';
import FormGroup from '../../molecules/FormGroup/FormGroup';

import 'react-datepicker/dist/react-datepicker.css';
import './Plannings.scss';


// Temporary
const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const getTimeOnly = (date) => {
  let time = new Date(date);
  return time.toTimeString();
}

const Plannings = props => {
  const currentDate = new Date();
  const currentDatePlusSeven = addDays(currentDate, 6);
  const planningList = useSelector(({ plannings }) => plannings.planningList);
  const dispatch = useDispatch();
  
  const formState = {
    title: '',
    shop: 'none',
    startDate: currentDate,
    endDate: currentDatePlusSeven,
    startHours: '',
    endHours: ''
  }

  const formReducer = (state, { field, value }) => {
    return {
      ...state, 
      [field]: value
    }
  }

  // const planningId = useSelector(({ plannings }) => plannings.loadedPlanning.id);
  const [toEdit, setToEdit] = useState(false);
  const [state, setState] = useReducer(formReducer, formState);

  const handleChange = (e, field = null, val = null) => {
    setState({
      field: field ? field : e.target.name,
      value: val ? val : e.target.value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    // 1 - Form validation
    const dataToSend = {
      ...state,
      startHours: getTimeOnly(state.startHours),
      endHours: getTimeOnly(state.endHours),
    }
    console.log(dataToSend)
    dispatch(setNewPlanning(dataToSend))
    // 2 - Send form to API
     // -> response has the new form
     // -> append response to Store
     // -> when done, redirect
    // 3 - Redirect to /plannings/edit/:id
    // setToEdit(true);
  }

  const {
    title,
    shop,
    startDate,
    endDate,
    startHours,
    endHours,
  } = state;

  const plannings = useMemo(() => {
    return (
      <ul className="plannings__list">
        { planningList.map((planning, index) => (
          <li key={ index } className="plannings__item">
            <span className="plannings__itemTitle">{ planning.title }</span>
            <span className="plannings__itemShop">{ planning.shop }</span>
            <span className="plannings__itemDates">{ planning.startDate } <br /> { planning.endDate }</span>
            <span className="plannings__itemHours">{ planning.startHours } - { planning.endHours }</span>
            <span className="plannings__itemStatus">{ planning.status }</span>
            <span className="plannings__itemActions">
              <Link to={`/plannings/edit/${planning.id}`}>Editer</Link>
              <Button>Supprimer</Button>
              <Button>Dupliquer</Button>
            </span>
          </li>
        )) }
      </ul>
    );
  }, [planningList]);

  return (
    <Fragment>
      {/* toEdit && planningId ? <Redirect to={ `/plannings/edit/${planningId}` } /> : null */}
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
          <p className="subtitle">Seuls les 7 derniers plannings sont affichés</p>
          { plannings }
        </Card>
      </div>
    </Fragment>
  );
};

export default Plannings;
