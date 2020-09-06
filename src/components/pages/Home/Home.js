import React, {
  useContext,
  useState, 
  useEffect,
} from 'react';

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
  }, []);
  
  function addUserPlannings () {
    if (user.plannings.length) {
      return user.plannings.map(({ _id, title }) => {
        return (<li key={ _id }><a href={ _id }>{ title }</a></li>)
      })
    }

    return (<li>Vous n'avez pas créer de planning</li>)
  }

  function addUserTeams () {
    if (user.team.length) {
      return user.team.map(({ _id, name }) => {
        return (<li key={ _id }><a href={ _id }>{ name }</a></li>)
      })
    }

    return (<li>Vous n'avez pas créer d'équipe</li>)
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="panels panels--left">
        <div className="panel">
          <CardHeading cardTitle={ 'Calendrier' } />
          <Card></Card>
        </div>
        <div className="panel">
          <CardHeading cardTitle={ 'Mon magasin' } />
          <Card></Card>
        </div>
        <div className="panel">
          <CardHeading cardTitle={ 'Activités' } />
          <Card></Card>
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
              { addUserPlannings() }
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
              { addUserTeams() }
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;