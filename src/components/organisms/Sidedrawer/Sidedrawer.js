import React from 'react';

import Title from '../../atoms/Title/Title';
import SidedrawerList from '../../molecules/SidedrawerList/SidedrawerList';

import styles from './Sidedrawer.module.scss';

const Sidedrawer = props => {
  return (
    <nav className={ styles.sidedrawer }>
      <Title titleLevel="1" titleText="Scheduler" />
      <div className={ `${styles.menu} menu--main` }>
        <SidedrawerList />
      </div>
      <div className="activity">
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