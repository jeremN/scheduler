import React, { 
  Fragment, 
  useState, 
  useMemo 
} from 'react';

import Card from '../../atoms/Card/Card';
import Avatar from '../../atoms/Avatar/Avatar';
import TeamsNav from '../../organisms/TeamsNav/TeamsNav';

import './Team.scss';

const Team = props => {
  const teams= [
    {
      name: 'Catherine Warren',
      email: 'catherinewarren@example.com',
      poste: 'Responsable adjoint',
      contract: 'CDI',
      hours: 35,
      teamName: 'Equipe 1',
      shop: 'Aubergenville',
      notes: null
    }, {
      name: 'John Doe',
      email: 'johndoe@example.com',
      poste: 'Responsable',
      contract: 'CDI',
      hours: 35,
      teamName: 'Equipe 1',
      shop: 'Aubergenville',
      notes: null
    }, {
      name: 'John Doe',
      email: 'johndoe@example.com',
      poste: 'Vendeur',
      contract: 'CDI',
      hours: 30,
      teamName: 'Equipe 1',
      shop: 'Aubergenville',
      notes: null
    }, {
      name: 'John Doe',
      email: 'johndoe@example.com',
      poste: 'Responsable',
      contract: 'CDI',
      hours: 35,
      teamName: 'Equipe 2',
      shop: 'Plaisir',
      notes: null
    }, {
      name: 'John Doe',
      email: 'johndoe@example.com',
      poste: 'Vendeur',
      contract: 'CDI',
      hours: 30,
      teamName: 'Equipe 2',
      shop: 'Plaisir',
      notes: 'Aucune note'
    },
  ];
  const [teamList, setTeamList] = useState(teams);

  const teamListBody = useMemo(() => {
    return (
      <ul className="teams__listBody">
        { teamList.map(member => (
          <Card>
            <div className="member__infos">
              <Avatar letter={ member.name.charAt(0) } />
              <span><b>{ member.name }</b> { member.email }</span>
            </div>
            <div className="member__poste">
              { member.poste }
            </div>
            <div className="member__contract">
              { member.contract }
            </div>
            <div className="member__hours">
              { member.hours }
            </div>
            <div className="member__teamName">
              { member.teamName }
            </div>
            <div className="member__shop">
              { member.shop }
            </div>
            <div className="member__notes">
              { member.notes }
            </div>
            <div className="member__actions">
              <svg 
                width="31" 
                height="6" 
                viewBox="0 0 31 6" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <circle cx="3.96118" cy="3" r="3" fill="#2B3858"/>
                  <circle cx="15.9612" cy="3" r="3" fill="#2B3858"/>
                  <circle cx="27.9612" cy="3" r="3" fill="#2B3858"/>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect x="0.961182" width="30" height="6" fill="white"/>
                  </clipPath>
                </defs>
              </svg>

            </div>
          </Card>
          ) )}
      </ul>
    );
  }, [teamList]);

  return (
    <Fragment>
      <TeamsNav />
      <div className="teams">
        <div className="teams__list">
          <ul className="teams__listHead">
            <li>Informations</li>
            <li>Poste</li>
            <li>Contrat</li>
            <li>Nombre d'heures</li>
            <li>Equipe</li>
            <li>Magasin</li>
            <li>Notes</li>
            <li>Actions</li>
          </ul>
          { teamListBody }
        </div>
      </div>
    </Fragment>
  );

};

export default Team;