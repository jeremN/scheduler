import React from 'react';

import TeamMemberCard from '../../molecules/TeamMemberCard/TeamMemberCard';

import clientWrapper from '../../../utilities/fetchWrapper';

import './TeamMembersList.scss';

const TeamMembersList = ({
  teamList,
  activeFilters,
  onDeleteFns = {
    clear: () => {},
    success: () => {},
    failed: () => {},
  },
}) => {
  function deleteMember(teamId, memberId) {
    const teams = [...teamList];

    clientWrapper(`teams/deleteTeammate/${teamId}/${memberId}`, {
      method: 'DELETE',
    }).then(async (result) => {
      const datas = await result;

      if (datas.deleted) {
        const teamToUpdate = teams.map((team) => {
          if (team._id === teamId) {
            const updatedMembers = [...team.members].filter(
              ({ _id }) => _id !== memberId
            );
            team.members = updatedMembers;
          }
          return team;
        });
        onDeleteFns.success(teamToUpdate);
      } else {
        onDeleteFns.failed();
        throw new Error(
          'An error occured while trying to delete a team member, please try again'
        );
      }
    });
  }

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
                  onDeleteMember={() => deleteMember(teamId, _id)}
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
