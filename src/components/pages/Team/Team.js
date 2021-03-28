import React, { Fragment, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';

import Checkbox from '../../atoms/Checkbox/Checkbox';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import TeamsNav from '../../organisms/TeamsNav/TeamsNav';
import TeamsMembersList from '../../organisms/TeamMembersList/TeamMembersList';
import SidebarNewMember from '../../organisms/TeamsSidebar/SidebarNewMember';
import SidebarNewTeam from '../../organisms/TeamsSidebar/SidebarNewTeam';

import { useClient } from '../../../context/authContext';
import { useAsync } from '../../../hooks/useAsync';

import './Team.scss';

const initialTeamState = {
  teamList: [],
  filters: {
    teamName: [],
    poste: ['vendeur', 'Responsable adjoint', 'Responsable'],
    contract: ['CDD', 'CDI', 'Freelance', 'Saisonnier'],
  },
  activeFilters: [],
  sidebarState: 'hidden',
  sidebarType: 'default',
};

const actionTypes = {
  setTeamList: 'SET_TEAM_LIST',
  setSidebarState: 'SET_SIDEBAR_STATE',
  setFilters: 'SET_FILTERS',
  setActiveFilters: 'SET_ACTIVE_FILTERS',
  setTeamsNames: 'SET_TEAMS_NAMES',
  clearSidebarState: 'CLEAR_SIDEBAR_STATE',
};

const teamReducer = (currentState, action) => {
  switch (action.type) {
    case actionTypes.setTeamList:
      return {
        ...currentState,
        teamList: action.payload,
      };
    case actionTypes.setSidebarState:
      return {
        ...currentState,
        sidebarState: action.payload.showSidebar,
        sidebarType: action.payload.type,
      };
    case actionTypes.setFilters:
      return {
        ...currentState,
        filters: {
          ...currentState.filters,
          teamName: [...action.payload],
        },
      };
    case actionTypes.setActiveFilters:
      return {
        ...currentState,
        activeFilters: [...action.payload],
      };
    case actionTypes.clearSidebarState:
      return {
        ...currentState,
        sidebarState: 'hidden',
        sidebarType: 'default',
      };
    default:
      return currentState;
  }
};

const Team = () => {
  const client = useClient();
  const query = new URLSearchParams(useLocation().search);
  const { isLoading, isSuccess, isError, error, run } = useAsync();

  const [teamState, setTeamState] = useReducer(teamReducer, initialTeamState);

  function setTeamsOptions(teamsArray = []) {
    return teamsArray.reduce((currentItem, nextItem) => {
      currentItem.push({
        value: nextItem._id,
        wording: nextItem.name,
      });
      return currentItem;
    }, []);
  }

  useEffect(() => {
    let mounted = true;
    run(
      client(`teams/teamsList`).then(async (result) => {
        const datas = await result;

        if (!!datas.teamsList && mounted) {
          setTeamState({
            type: actionTypes.setTeamList,
            payload: datas.teamsList,
          });
        }
      })
    );
    return function cleanup() {
      mounted = false;
    };
  }, [client, run]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const options = setTeamsOptions(teamState.teamList);

      setTeamState({
        type: actionTypes.setFilters,
        payload: options,
      });
      setTeamState({
        type: actionTypes.setActiveFilters,
        payload: options.map((team) => {
          if (query.get('filter') && team.value === query.get('filter')) {
            return team.wording;
          } else if (!query.get('filter')) {
            return team.wording;
          } else {
            return null;
          }
        }),
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [teamState.teamList]);

  function setSidebarStateType(newType) {
    const isSidebarHiddenOrAlreadyVisible =
      teamState.sidebarState === 'hidden' ||
      (teamState.sidebarState === 'show' && teamState.sidebarType !== newType);
    setTeamState({
      type: actionTypes.setSidebarState,
      payload: {
        showSidebar: isSidebarHiddenOrAlreadyVisible ? 'show' : 'hidden',
        type: newType,
      },
    });
  }

  function onSubmitNewMember() {
    return {
      success: ({ _id: teamId, members }) => {
        const updatedTeams = teamState.teamList.map((team) => {
          if (teamId === team._id) {
            team.members = members;
          }
          return team;
        });
        setTeamState({
          type: actionTypes.setTeamList,
          payload: updatedTeams,
        });
      },
      clear: () => {
        setTeamState({ type: actionTypes.clearSidebarState });
      },
    };
  }

  function onSubmitNewTeam() {
    return {
      success: (datas) => {
        setTeamState({ type: actionTypes.setTeamList, payload: datas });
      },
      clear: () => {
        setTeamState({ type: actionTypes.clearSidebarState });
      },
    };
  }

  function toggleSidebar(type = 'default') {
    const types = {
      member: (
        <SidebarNewMember
          onCloseSidebar={() => onCloseSidebar()}
          teamsOptions={teamState.filters.teamName}
          teams={[...teamState.teamList]}
          onSubmitFns={onSubmitNewMember()}
        />
      ),
      team: (
        <SidebarNewTeam
          onCloseSidebar={() => onCloseSidebar()}
          onSubmitFns={onSubmitNewTeam()}
        />
      ),
      default: null,
    };

    return types[type];
  }

  function onDeleteMember(teamId, memberId) {
    const teams = [...teamState.teamList];

    client(`teams/deleteTeammate/${teamId}/${memberId}`, {
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
        setTeamState({
          type: actionTypes.setTeamList,
          payload: teamToUpdate,
        });
      } else {
        throw new Error(
          'An error occured while trying to delete a team member, please try again'
        );
      }
    });
  }

  const onFiltersChangeHandler = (evt) => {
    const nameToFind = evt.target.name;
    const isActive = teamState.activeFilters.includes(nameToFind);
    let updatedFilters = [...teamState.activeFilters];

    if (isActive) {
      updatedFilters = [...teamState.activeFilters].filter(
        (name) => name !== nameToFind
      );
    } else {
      updatedFilters.push(nameToFind);
    }
    setTeamState({
      type: actionTypes.setActiveFilters,
      payload: updatedFilters,
    });
  };

  const getMembersLength = () => {
    let countMembers = 0;
    teamState.teamList.forEach(({ members }) => {
      countMembers += members.length;
    });

    return countMembers;
  };

  const TeamsNamesFilters = () => (
    <Fragment>
      {teamState.filters.teamName.map(({ value, wording }) => (
        <FormGroup
          key={`teamFilter_${value}`}
          labelId={`activeTeam__${value}`}
          classes="teams__filterLabel"
          wording={wording}>
          <Checkbox
            id={`activeTeam__${value}`}
            name={wording}
            type={'checkbox'}
            checked={teamState.activeFilters.includes(wording)}
            onChangeFn={onFiltersChangeHandler}
          />
        </FormGroup>
      ))}
    </Fragment>
  );

  const onCloseSidebar = () => {
    setSidebarStateType('default');
    setTeamState({ type: actionTypes.clearSidebarState });
  };

  return (
    <main>
      <TeamsNav
        teamsMembersLength={[teamState.teamList.length, getMembersLength()]}
        addNewTeamMemberFn={() => setSidebarStateType('member')}
        createTeamFn={() => setSidebarStateType('team')}
      />
      <div className="teams">
        <h2>Mes équipes</h2>
        <div className="teams__filters">
          <p>Afficher: </p>
          <TeamsNamesFilters />
        </div>
        {isLoading ? <div>Chargement...</div> : null}
        {isError ? <div>{error}</div> : null}
        {isSuccess ? (
          <TeamsMembersList
            teamList={teamState.teamList}
            activeFilters={teamState.activeFilters}
            onDeleteFn={onDeleteMember}
          />
        ) : null}
      </div>
      {teamState.sidebarState === 'show'
        ? toggleSidebar(teamState.sidebarType)
        : null}
    </main>
  );
};

export default Team;
