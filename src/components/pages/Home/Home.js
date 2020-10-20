import React, { useContext, useState, useEffect } from 'react';

import Calendar from 'react-calendar';

import Card from '../../atoms/Card/Card';
import CardHeading from '../../molecules/CardHeading/CardHeading';
import ButtonLink from '../../atoms/Link/Link';

import { AuthContext } from '../../../App';
import clientWrapper from '../../../utilities/fetchWrapper';

import './Home.scss';

const Home = () => {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    team: [],
    plannings: [],
  });
  const [requestState, setRequestState] = useState({
    status: 'idle',
    error: null,
  });

  useEffect(() => {
    setRequestState({ status: 'pending' });
    clientWrapper(`user/${state.userId}`)
      .then(async (result) => {
        const datas = await result;

        if (!!datas.user) {
          setUser(datas.user);
          setRequestState({ status: 'fulfilled' });
        } else {
          setRequestState({ status: 'rejected', error: datas });
        }
      })
      .finally(() => {
        setRequestState({ status: 'idle' });
      });
  }, [state.userId]);

  const wordingDefault = {
    noPlanningDefault: "Vous n'avez pas créer de planning",
    noTeamDefault: "Vous n'avez pas créer d'équipe",
  };

  function addListLink(list, keyToAdd, defaultLink) {
    if (list.length) {
      return list.map((item) => (
        <li key={item._id}>
          <a href={`/team/${item._id}`}>{item[keyToAdd]}</a>
        </li>
      ));
    }
    return <li>{wordingDefault[defaultLink]}</li>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="panels panels--left">
        <div className="panel">
          <CardHeading cardTitle={'Calendrier'} />
          <Card>
            <Calendar />
          </Card>
        </div>
        <div className="panel">
          <CardHeading cardTitle={'Mon magasin'} />
          <Card>Pas de magasin enregistrer</Card>
        </div>
        <div className="panel">
          <CardHeading cardTitle={'Activités'} />
          <Card>Pas d'activitées pour le moment</Card>
        </div>
      </div>
      <div className="panels panels--center">
        <div className="panel panel--center">
          <CardHeading cardTitle={'Mes plannings'} modifiers={['withButton']}>
            <ButtonLink
              linkTo="/plannings"
              linkId="myPlanningsLink"
              modifiers={['primary', 'rounded']}>
              Accéder à mes plannings
            </ButtonLink>
          </CardHeading>
          <Card>
            <ul>
              {requestState === 'pending' ? (
                <li>Chargement...</li>
              ) : (
                addListLink(user.plannings, 'title', 'noPlanningDefault')
              )}
            </ul>
          </Card>
        </div>
      </div>
      <div className="panels panels--right">
        <div className="panel panel--right">
          <CardHeading cardTitle={'Mes équipes'} modifiers={['withButton']}>
            <ButtonLink
              linkTo="/team"
              linkId="myTeamsLink"
              modifiers={['primary', 'rounded']}>
              Accéder à mes équipes
            </ButtonLink>
          </CardHeading>
          <Card>
            <ul>
              {requestState === 'pending' ? (
                <li>Chargement...</li>
              ) : (
                addListLink(user.team, 'name', 'noTeamDefault')
              )}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
