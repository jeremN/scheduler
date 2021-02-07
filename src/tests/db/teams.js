let teams = [];

async function create(teamsList) {
  teams = teamsList;
  return teams;
}

async function getTeams() {
  return teams;
}

async function getTeam(teamId) {
  return teams.filter(({ _id }) => _id === teamId);
}

async function updateTeam(teamId, payload) {
  teams = teams.map((team) => {
    if (team._id === teamId) {
      team = {
        ...team,
        ...payload,
      };
    }

    return team;
  });

  return teams;
}

async function deleteTeam(teamId) {}

async function getTeammate(memberId, members) {
  return members.filter(({ _id }) => _id === memberId);
}

async function updateTeammate(teamId, memberId, payload) {
  const currentTeams = [...teams];
  const updatedTeams = currentTeams.map((team) => {
    let currentTeam = { ...team };

    if (currentTeam._id === teamId) {
      currentTeam.members = team.members.map((member) => {
        if (member._id === memberId) {
          console.debug('A');
          return {
            ...member,
            ...payload,
            notes: [...member?.notes, ...payload?.notes],
          };
        }
        console.debug('B');
        return member;
      });
      console.debug('D');
      return currentTeam;
    }
    console.debug('E');
    return currentTeam;
  });
  console.debug('F', updatedTeams);

  console.debug('updated', updatedTeams);
  teams = updatedTeams;
  return teams;
}

async function deleteTeammate(teamId, memberId) {}

async function reset() {
  teams = [];
}

export {
  create,
  getTeam,
  getTeams,
  updateTeam,
  deleteTeam,
  getTeammate,
  updateTeammate,
  deleteTeammate,
  reset,
};
