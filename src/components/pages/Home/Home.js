import React, {
  useContext,
  useState, 
  useEffect,
} from 'react';

import Calendar from 'react-calendar';

import Card from '../../atoms/Card/Card';
import CardHeading from '../../molecules/CardHeading/CardHeading';
import ButtonLink from '../../atoms/Link/Link';

import { AuthContext } from '../../../App';
import clientWrapper from '../../../utilities/fetchWrapper';

import './Home.scss';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  team: [],
  plannings: []
}

const Home = props => {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    clientWrapper(`user/${state.userId}`)
      .then(async (result) => {
        const datas = await result;

        if (!!datas.user) {
          await setUser(datas.user)
        }
      })
  }, [state.userId]);

  const noPlanningDefault = (<li>Vous n'avez pas créer de planning</li>);
  const noTeamDefault = (<li>Vous n'avez pas créer d'équipe</li>);
  
  function addListLink (list, keyToAdd, defaultLink) {
    if (list.length) {
      return list.map((item) => (
        <li key={ item._id }><a href={ item._id }>{ item[keyToAdd] }</a></li>)
      );
    }
    return defaultLink;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="panels panels--left">
        <div className="panel">
          <CardHeading cardTitle={ 'Calendrier' } />
          <Card>
            <Calendar />
          </Card>
        </div>
        <div className="panel">
          <CardHeading cardTitle={ 'Mon magasin' } />
          <Card>
            Pas de magasin enregistrer
          </Card>
        </div>
        <div className="panel">
          <CardHeading cardTitle={ 'Activités' } />
          <Card>
            Pas d'activitées pour le moment
          </Card>
        </div>
      </div>
      <div className="panels panels--center">
        <div className="panel panel--center">
          <CardHeading cardTitle={ 'Mes plannings' } modifiers={ ['withButton'] }>
            <ButtonLink 
              linkTo="/plannings" 
              linkId="myPlanningsLink"
              modifiers={ ['primary', 'rounded'] }>
              Accéder à mes plannings
            </ButtonLink>
          </CardHeading>
          <Card>
            <ul>
              { addListLink(user.plannings, 'title', noPlanningDefault) }
            </ul>
          </Card>
        </div>
      </div>
      <div className="panels panels--right">
        <div className="panel panel--right">
          <CardHeading cardTitle={ 'Mes équipes' } modifiers={ ['withButton'] }>
            <ButtonLink 
              linkTo="/team" 
              linkId="myTeamsLink"
              modifiers={ ['primary', 'rounded'] }>
              Accéder à mes équipes
            </ButtonLink>
          </CardHeading>
          <Card>
            <ul>
              { addListLink(user.team, 'name', noTeamDefault) }
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;