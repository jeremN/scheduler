import React from 'react';

import { menu } from './Header.module.scss';

const Header = props => {
  return (
    <header className={ `${menu} menu--top` }>
      <div className="menu__leftBlock">
        <a className="btn">Back button</a>
      </div>
      <div className="menu__centerBlock">
        <form className="form">
          <p>Dates</p>
          <div className="form__group">
            <label className="form__label" for="planningStartDate">Du:</label>
            <input 
              className="form__field" 
              id="planningStartDate" 
              name="planningStartDate" 
              type="date" 
              value="" />
          </div>
          <div className="form__group">
            <label className="form__label" for="planningEndDate">Au:</label>
            <input 
              className="form__field" 
              id="planningEndDate" 
              name="planningEndDate" 
              type="date" 
              value="" />
          </div>
        </form>
        <form className="form">
          <p>Horaires d'ouverture</p>
          <div className="form__group">
            <label className="form__label" for="workingHoursStartTime">De:</label>
            <input 
              className="form__field" 
              id="workingHoursStartTime" 
              name="workingHoursStartTime" 
              type="time" 
              value="" />
          </div>
          <div className="form__group">
            <label className="form__label" for="workingHoursEndTime">A:</label>
            <input 
              className="form__field" 
              id="workingHoursEndTime" 
              name="workingHoursEndTime" 
              type="time" 
              value="" />
          </div>
        </form>
        <form className="form">
          <fieldset>
            <legend className="form__legend"> Afficher par:</legend>
            <div className="form__group">
              <input id="showBy-day" className="form__radio" name="showBy" type="radio" value="day"/>
              <label className="form__label" for="showBy-day">Jour</label>
            </div>
            <div className="form__group">
              <input id="showBy-week" className="form__radio" name="showBy" type="radio" value="week"/>
              <label className="form__label" for="showBy-week">Semaine</label>
            </div>
            <div className="form__group">
              <input id="showBy-month" className="form__radio" name="showBy" type="radio" value="month"/>
              <label className="form__label" for="showBy-month">Mois</label>
            </div>
            <div className="form__group">
              <input id="showBy-year" className="form__radio" name="showBy" type="radio" value="year"/>
              <label className="form__label" for="showBy-year">Année</label>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="menu__right"></div>
    </header>
  );
}

export default Header;