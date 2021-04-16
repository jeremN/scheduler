import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Calendar from 'react-calendar';
import Card from '../../atoms/Card/Card';
import CardHeading from '../../molecules/CardHeading/CardHeading';
import ButtonLink from '../../atoms/Link/Link';
import { useAuth, useClient } from '../../../context/authContext';
import { useAsync } from '../../../hooks/useAsync';
import './Home.scss';

const Home = () => {
  const { user, setData } = useAuth();
  const client = useClient();
  const { isLoading, isSuccess, isError, error, run } = useAsync();
  const [currentUser, setCurrentUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    team: [],
    plannings: [],
  });

  useEffect(() => {
    run(
      client(`user/${user.userId}`).then(async (result) => {
        const datas = await result;

        if (datas.user) {
          setCurrentUser(datas.user);
        }
      })
    );
  }, [user.userId, client, run]);

  useEffect(() => {
    const userTeams = currentUser.team.map(({ name, _id }) => ({
      _id,
      name,
    }));
    setData({ ...user, teams: userTeams });
  }, [user, currentUser.team, setData]);

  const wordingDefault = {
    noPlanningDefault: "Vous n'avez pas créer de planning",
    noTeamDefault: "Vous n'avez pas créer d'équipe",
  };

  function addListLink(list, keyToAdd, defaultLink, routeTo) {
    if (list.length) {
      return list.map((item) => (
        <li key={item._id}>
          <Link to={`${routeTo}${item._id}`}>{item[keyToAdd]}</Link>
        </li>
      ));
    }
    return <li>{wordingDefault[defaultLink]}</li>;
  }

  return (
    <main className="dashboard">
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
              {isLoading ? (
                <li>Chargement...</li>
              ) : isError ? (
                <div>Une erreur s'est produite {error} </div>
              ) : isSuccess ? (
                addListLink(
                  currentUser.plannings,
                  'title',
                  'noPlanningDefault',
                  '/plannings/edit/'
                )
              ) : null}
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
              {isLoading ? (
                <li>Chargement...</li>
              ) : isError ? (
                <div>Une erreur s'est produite {error} </div>
              ) : isSuccess ? (
                addListLink(
                  currentUser.team,
                  'name',
                  'noTeamDefault',
                  '/team?filter='
                )
              ) : null}
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Home;
