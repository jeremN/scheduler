import React, { 
  Fragment, 
  useState, 
  useEffect,
  useContext,
} from 'react';

import TeamsNav from '../../organisms/TeamsNav/TeamsNav';
import TeamMemberCard from '../../molecules/TeamMemberCard/TeamMemberCard';

import { AuthContext } from '../../../App';
import clientWrapper from '../../../utilities/fetchWrapper';

import './Team.scss';

const teams= [
  {
    _id: 29,
    name: 'Catherine Warren',
    email: 'catherinewarren@example.com',
    poste: 'Responsable adjoint',
    contract: 'CDI',
    hours: 35,
    teamName: 'Equipe 1',
    shop: 'Aubergenville',
    notes: null
  }, {
    _id: 17,
    name: 'John Doe',
    email: 'johndoe@example.com',
    poste: 'Responsable',
    contract: 'CDI',
    hours: 35,
    teamName: 'Equipe 1',
    shop: 'Aubergenville',
    notes: null
  }, {
    _id: 12,
    name: 'John Doe',
    email: 'johndoe@example.com',
    poste: 'Vendeur',
    contract: 'CDI',
    hours: 30,
    teamName: 'Equipe 1',
    shop: 'Aubergenville',
    notes: null
  }, {
    _id: 6,
    name: 'John Doe',
    email: 'johndoe@example.com',
    poste: 'Responsable',
    contract: 'CDI',
    hours: 35,
    teamName: 'Equipe 2',
    shop: 'Plaisir',
    notes: null
  }, {
    _id: 5,
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
const showByOptionsList = [
  { 
    value: 'default',
    wording: 'Défaut' 
  }, { 
    value: 'poste', 
    wording: 'Poste' 
  }, { 
    value: 'shop', 
    wording: 'Magasin'
  }, { 
    value: 'contract', 
    wording: 'Contrat' 
  }, { 
    value: 'teamName', 
    wording: 'Equipe' 
  }
];

const Team = props => {
  const { state } = useContext(AuthContext);
  const [teamList, setTeamList] = useState(teams);
  const [filterValue, setFilterValue] = useState('default');

  useEffect(() => {
    clientWrapper(`teams/teamsList`)
      .then(async (result) => {
        const datas = await result;

        if (!!datas.teamsList) {
          // await setTeamList(datas.teamsList)
        }
      })
    }, [state.userId]);

  const sortTeamListHandler = ({ target }) => {
    const valueToSearch = target.value;
    setFilterValue(target.value);

    // if (valueToSearch === 'default') {
    //   setTeamList(listDefault);
    //   return;
    // }

    let sortedTeamList = teamList.sort((firstEntry, secondEntry) => 
      firstEntry[valueToSearch].localeCompare( secondEntry[valueToSearch], 'fr', { ignorePunctuation: true }) );
    
    setTeamList(sortedTeamList);
  }
  
  return (
    <Fragment>
      <TeamsNav
        teamLen={ teamList.length }
        onFilterChange={ sortTeamListHandler } 
        showByOptionsArray={ showByOptionsList } 
        defaultFilterValue={ filterValue } />
      <div className="teams">
        <h2>Mes équipes</h2>
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
          <ul className="teams__listBody">
            { teamList.map((member) => (<TeamMemberCard member={ member } />) )}
          </ul>
        </div>
      </div>
    </Fragment>
  );

};

export default Team;