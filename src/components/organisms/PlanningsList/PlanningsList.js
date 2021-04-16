import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../atoms/Buttons/Buttons';
import './PlanningsList.scss';

const PlanningsList = ({ planningsList, onDelete, onDuplicate }) => {
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
      {planningsList.map((planning) => (
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
            <Button clicked={(evt) => onDelete(evt, planning._id)}>
              Supprimer
            </Button>
            <Button clicked={(evt) => onDuplicate(evt, planning._id)}>
              Dupliquer
            </Button>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PlanningsList;
