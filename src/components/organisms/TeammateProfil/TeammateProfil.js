import React, { Fragment } from 'react';

import Card from '../../atoms/Card/Card';
import Avatar from '../../atoms/Avatar/Avatar';

const TeammateProfil = ({ user }) => (
  <Fragment>
    <Card classes={['teammate__infos']}>
      <Avatar letter={user.firstname.charAt(0)} />
      <p className="teammate__name">
        <span>
          {user.firstname} {user.lastname}
        </span>
      </p>
      <p className="teammate__email">{user.email}</p>
    </Card>
    <Card classes={['teammate__profil']}>
      <div className="teammate__poste">
        Poste <br /> <span>{user.poste}</span>
      </div>
      <div className="teammate__contract">
        Contrat <br /> <span>{user.contract}</span>
      </div>
      <div className="teammate__hours">
        Heures / semaine <br /> <span>{user.hours}</span>
      </div>
      <div className="teammate__teamName">
        Equipe <br /> <span>{user.teamName}</span>
      </div>
      <div className="teammate__shop">
        Magasin <br />
        <span>
          {user.location.city} {user.location.address}
        </span>
      </div>
      <div className="teammate__status">
        Status <br />
        <span>{user.status}</span>
      </div>
    </Card>
  </Fragment>
);

export default TeammateProfil;
