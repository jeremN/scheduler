import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../../../atoms/Card/Card';
import Avatar from '../../../atoms/Avatar/Avatar';
import Button from '../../../atoms/Buttons/Buttons';
import Icon from '../../../atoms/Icon/Icon';
import TeammateNav from '../../../organisms/TeammateNav/TeammateNav';

import clientWrapper from '../../../../utilities/fetchWrapper';

import './Teammate.scss';

const initialState = {
  _id: '',
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
  status: 'En attente',
  notes: [],
  plannings: [],
};

const Teammate = (props) => {
  const [teammate, setTeammate] = useState(initialState);
  let { id, memberId } = useParams();

  useEffect(() => {
    let mounted = true;

    clientWrapper(`teams/teammate/${id}/${memberId}`).then(async (result) => {
      const datas = await result;
      console.log('Teammate: ', datas.teammate[0]);

      if (!!datas.teammate && mounted) {
        setTeammate({
          ...teammate,
          ...datas.teammate[0],
          location: {
            ...datas.location,
          },
          teamName: datas.teamName,
        });
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, [id, memberId]);

  const TeammateProfil = () => (
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
          {teammate.firstname} {teammate.lastname}
        </h2>
      </div>
      <section className="teammate__main">
        <Card classes={['teammate__infos']}>
          <Avatar letter={'J'} />
          <p className="teammate__name">
            <span>
              {teammate.firstname} {teammate.lastname}
            </span>
          </p>
          <p className="teammate__email">{teammate.email}</p>
        </Card>
        <Card classes={['teammate__profil']}>
          <div className="teammate__poste">
            Poste <br /> <span>{teammate.poste}</span>
          </div>
          <div className="teammate__contract">
            Contrat <br /> <span>{teammate.contract}</span>
          </div>
          <div className="teammate__hours">
            Heures / semaine <br /> <span>{teammate.hours}</span>
          </div>
          <div className="teammate__teamName">
            Equipe <br /> <span>{teammate.teamName}</span>
          </div>
          <div className="teammate__shop">
            Magasin <br />
            <span>
              {teammate.location.city} {teammate.location.address}
            </span>
          </div>
          <div className="teammate__status">
            Status <br />
            <span>{teammate.status}</span>
          </div>
        </Card>
        <Card classes={['teammate__plannings']}>
          <h2>Plannings</h2>
          <ul>
            <li>planning 1</li>
            <li>planning 2</li>
            <li>planning 3...</li>
          </ul>
        </Card>
      </section>
      <aside className="teammate__others">
        <Card tag={'form'} classes={['teammate__newNote']}>
          <h2>Notes</h2>
          <form onSubmit={() => {}}>
            <textarea></textarea>
            <Button modifiers={['primary']} type="submit">
              Enregistrer la note
            </Button>
          </form>
          <ul className="teammate__notesList">
            {teammate.notes.map((note) => (
              <li>{note}</li>
            ))}
          </ul>
        </Card>
      </aside>
    </div>
  );

  return (
    <Fragment>
      <TeammateNav
        team={teammate.teamName}
        name={`${teammate.firstname} ${teammate.lastname}`}
      />
      <TeammateProfil />
    </Fragment>
  );
};

export default Teammate;
