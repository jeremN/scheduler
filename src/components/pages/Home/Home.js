import React from 'react';

import Card from '../../atoms/Card/Card';

import './Home.scss';

const Home = props => {
  return (
    <div className="dashboard">
      <Card modifiers={ ['primary'] } classes={ ['card__item--1'] }>
        <h3>Bienvenue <span>John Doe</span></h3>
        <div>Graph nbre d'heures attribuées (par mag gérer)</div>
      </Card>
      <Card classes={ ['card__item--2'] }>
        <h3>Mon magasin</h3>
        <div>Gmap (magasin principal)</div>
        <div>Btn to team page/mon mag</div>
      </Card>
      <Card classes={ ['card__item--3'] }>
        <h3>Télécharger un planning</h3>
        <ul>
          <li>Planning 1</li>
          <li>Planning 2</li>
          <li>Planning 3</li>
          <li>...</li>
        </ul>
        <div>Btn to planning page</div>
      </Card>
      <Card classes={ ['card__item--4'] }>
        <h3>Mes collaborateurs (nbre de collaborateurs / mag, affiche que les 2ers mag)</h3>
        <div>
          <h4>Mag 1, nombre de collaborateurs</h4>
          <span>5</span>
        </div>
        <div>Btn to team page</div>
      </Card>
      <Card classes={ ['card__item--5'] }>
        <h3>???</h3>
      </Card>
      <Card classes={ ['card__item--6'] }>
        <h3>???</h3>
      </Card>
    </div>
  );
};

export default Home;