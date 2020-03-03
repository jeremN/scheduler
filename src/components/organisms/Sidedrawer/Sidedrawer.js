import React from 'react';

import Title from '../../atoms/Title/Title';

import { sidedrawer } from './Sidedrawer.module.scss';

const Sidedrawer = props => {
  return (
    <nav className={ sidedrawer }>
      <Title titleLevel="1" titleText="Scheduler" />
      <div className="menu menu--main">
        <h2 class="menu__title">Menu</h2>
        <ul className="menu__list list">
          <li className="menu__item list__item">
            <a className="menu__link list__link" href="#">Accueil</a>
          </li>
          <li className="menu__item list__item">
            <a className="menu__link list__link" href="#">Inbox</a>
          </li>
          <li className="menu__item list__item">
            <a className="menu__link list__link" href="#">Plannings</a>
          </li>            
          <li className="menu__item list__item">
            <a className="menu__link list__link" href="#">Statistiques</a>
          </li>
          <li className="menu__item list__item">
            <a className="menu__link list__link" href="#">Equipes</a>
          </li>
          <li className="menu__item list__item">
            <a className="menu__link list__link" href="#">Paramètres</a>
          </li>
        </ul>
      </div>
      <div className="activity">
       <h2 className="activity__title">Activité</h2>
       <ul className="activity__list list">
         <li className="activity__item list__item">
           Some message
         </li>
       </ul>
      </div>
    </nav>
  )
}

export default Sidedrawer;