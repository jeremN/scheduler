import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../../atoms/Card/Card';
import Icon from '../../atoms/Icon/Icon';
import Loader from '../../atoms/Loader/Loader';
import TeammateNav from '../../organisms/TeammateNav/TeammateNav';
import EditProfil from '../../organisms/TeammateEditForm/TeammateEditForm';
import TeammateProfil from '../../organisms/TeammateProfil/TeammateProfil';
import TeammateNotes from '../../organisms/TeammateNotes/TeammateNotes';

import { useClient } from '../../../context/authContext';
import { useAsync } from '../../../hooks/useAsync';

import './Teammate.scss';

const initialState = {
  _id: '',
  user: {
    firstname: '',
    lastname: '',
    contract: '',
    hours: '',
    poste: '',
    email: '',
    teamName: '',
    location: {
      city: '',
      address: '',
    },
    status: '',
    notes: [],
    plannings: [],
  },
};

const Teammate = () => {
  let { id, memberId } = useParams();
  const client = useClient();
  const { run, isError, isLoading, isSuccess } = useAsync();
  const [teammate, setTeammate] = useState(initialState);
  const [teammateProfilStatus, setTeammateProfilStatus] = useState('show');

  useEffect(() => {
    let mounted = true;

    run(
      client(`teams/teammate/${id}/${memberId}`).then(async (result) => {
        const datas = await result;

        if (!!datas.teammate && mounted) {
          const userObj = {};
          Object.keys(datas.teammate[0]).map((key) =>
            key !== '_id' ? (userObj[key] = datas.teammate[0][key]) : null
          );

          setTeammate({
            _id: datas.teammate[0]._id,
            user: {
              ...userObj,
              location: {
                ...datas.location,
              },
              teamName: datas.teamName,
              status: 'En attente',
              plannings: [],
            },
          });
        }
      })
    );
    return function cleanup() {
      mounted = false;
    };
  }, [id, memberId, client]);

  function setEditProfilInitialState() {
    return { ...teammate };
  }

  function useUpdateTeammate(updatedUser) {
    run(
      client(`teams/updateTeammate/${id}/${memberId}`, {
        body: {
          updatedTeammate: updatedUser,
        },
        method: 'PUT',
      })
        .then(async (result) => {
          const datas = await result;

          if (datas.updated) {
            setTeammate({
              ...teammate,
              user: {
                ...teammate.user,
                ...updatedUser,
              },
            });
          }
        })
        .finally(() => setTeammateProfilStatus('show'))
    );
  }

  return (
    <Fragment>
      <TeammateNav
        team={teammate.user.teamName}
        name={`${teammate.user.firstname} ${teammate.user.lastname}`}
        editTeammateFn={() => setTeammateProfilStatus('edit')}
      />
      <div className="teammate">
        <div className="teammate__title">
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              aria-hidden="true"
              viewBox="0 0 448 512">
              <path
                fill="#1c85e9"
                d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
              />
            </svg>
          </Icon>
          <h2>
            {teammate.user.firstname} {teammate.user.lastname}
          </h2>
          {isLoading ? <Loader /> : ''}
        </div>
        <section className="teammate__main">
          {teammateProfilStatus === 'edit' ? (
            <EditProfil
              initialState={{ ...teammate }}
              onSubmit={useUpdateTeammate}
              onCancelFn={() => setTeammateProfilStatus('show')}
            />
          ) : (
            <TeammateProfil user={teammate.user} />
          )}
          <Card classes={['teammate__plannings']}>
            <h2>Plannings ({teammate.user.plannings.length})</h2>
            <ul>
              {teammate.user.plannings.length ? (
                teammate.user.plannings.map((planning) => <li>{planning}</li>)
              ) : (
                <li>Pas de planning enregistré...</li>
              )}
            </ul>
          </Card>
        </section>
        <aside className="teammate__others">
          <TeammateNotes
            notes={teammate.user.notes}
            onSubmit={useUpdateTeammate}
          />
        </aside>
      </div>
    </Fragment>
  );
};

export default Teammate;
