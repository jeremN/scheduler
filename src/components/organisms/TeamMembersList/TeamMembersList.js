import React from 'react';

import TeamMemberCard from '../../molecules/TeamMemberCard/TeamMemberCard';

import './TeamMembersList.scss';

const TeamMembersList = ({
  teamList,
  activeFilters,
  onDeleteFn = () => {},
}) => {
  return (
    <div className="teams__list">
      <ul className="teams__listHead">
        <li>Informations</li>
        <li>Poste</li>
        <li>Contrat</li>
        <li>Nombre d'heures</li>
        <li>Equipe</li>
        <li>Magasin</li>
        <li>Lien vers la fiche</li>
        <li>Actions</li>
      </ul>
      <ul className="teams__listBody">
        {teamList.map(({ _id: teamId, name, members, location }) => {
          if (activeFilters.includes(name)) {
            return members.map(
              ({ _id, firstname, lastname, email, hours, poste, contract }) => (
                <TeamMemberCard
                  key={_id}
                  onDeleteMember={() => onDeleteFn(teamId, _id)}
                  member={{
                    _id,
                    email,
                    hours,
                    poste,
                    contract,
                    teamId,
                    shop: location.city || '',
                    teamName: name,
                    name: `${firstname} ${lastname}`,
                  }}
                />
              )
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
};

export default TeamMembersList;
