import React, { 
  Fragment,
  useReducer,
  useState,
  useMemo
} from 'react';
import { Redirect, Link } from 'react-router-dom';

import DatePicker from 'react-datepicker';

import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Buttons/Buttons';
import Input from '../../atoms/Input/Input';
import FormGroup from '../../molecules/FormGroup/FormGroup';

import 'react-datepicker/dist/react-datepicker.css';
import './Plannings.scss';


// Temporary
const planningList = [
  {
    id: 1,
    title: 'Planning 1',
    shop: 'aubergenville',
    startDate: '13/04/2020',
    endDate: '19/04/2020',
    startHour: '8h30',
    endHour: '20h30',
    status: 'plublished'
  }, {
    id: 2,
    title: 'Planning 1',
    shop: 'aubergenville',
    startDate: '13/04/2020',
    endDate: '19/04/2020',
    startHour: '8h30',
    endHour: '20h30',
    status: 'wip'
  }, {
    id: 3,
    title: 'Planning 2',
    shop: 'aubergenville',
    startDate: '20/04/2020',
    endDate: '27/04/2020',
    startHour: '8h30',
    endHour: '20h30',
    status: 'wip'
  }
]

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

  const initialState = {
    title: '',
    shop: 'none',
    startDate: currentDate,
    endDate: currentDatePlusSeven,
    startHour: '',
    endHour: ''
  }

  const formReducer = (state, { field, value }) => {
    return {
      ...state, 
      [field]: value
    }
  }

  const [id, setId] = useState('');
  const [toEdit, setToEdit] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e, field = null, val = null) => {
    dispatch({
      field: field ? field : e.target.name,
      value: val ? val : e.target.value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    // 1 - Form validation
    const dataToSend = {
      ...state,
      startHour: getTimeOnly(state.startHour),
      endHour: getTimeOnly(state.endHour),
    }
    console.log(dataToSend)
    // 2 - Send form to API
     // -> response has the new form
     // -> append response to Store
     setId(3);
     // -> when done, redirect
    // 3 - Redirect to /plannings/edit/:id
    setToEdit(true);

  }
  const {
    title,
    shop,
    startDate,
    endDate,
    startHour,
    endHour,
  } = state;

  const plannings = useMemo(() => {
    return (
      <ul className="plannings__list">
        { planningList.map((planning, index) => (
          <li key={ index } className="plannings__item">
            <span className="plannings__itemTitle">{ planning.title }</span>
            <span className="plannings__itemShop">{ planning.shop }</span>
            <span className="plannings__itemDates">{ planning.startDate } <br /> { planning.endDate }</span>
            <span className="plannings__itemHours">{ planning.startHour } - { planning.endHour }</span>
            <span className="plannings__itemStatus">{ planning.status }</span>
            <span className="plannings__itemActions">
              <Link to={`/plannings/edit/${planning.id}`}>Editer</Link>
              <Button>Supprimer</Button>
              <Button>Dupliquer</Button>
            </span>
          </li>
        ))}
      </ul>
    );
  }, [planningList]);

  return (
    <Fragment>
      { toEdit && id ? <Redirect to={ `/plannings/edit/${id}` } /> : null }
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
                  selected={ startHour }
                  showTimeSelect
                  showTimeSelectOnly
                  onChange={ date => handleChange(null, 'startHour', date) }
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
                  selected={ endHour }
                  showTimeSelect
                  showTimeSelectOnly
                  onChange={ date => handleChange(null, 'endHour', date) }
                  dateFormat="hh:mm" />
              </FormGroup>
            </div> 
            <Button modifiers={ ['primary'] } type="submit">
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
