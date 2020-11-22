import React, { Fragment, useEffect, useReducer } from 'react';

import Checkbox from '../../atoms/Checkbox/Checkbox';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import TeamsNav from '../../organisms/TeamsNav/TeamsNav';
import TeamMemberCard from '../../molecules/TeamMemberCard/TeamMemberCard';
import { SidebarFilters } from '../../organisms/TeamsSidebar/TeamsSidebar';
import SidebarNewMember from '../../organisms/TeamsSidebar/SidebarNewMember';
import SidebarNewTeam from '../../organisms/TeamsSidebar/SidebarNewTeam';

import clientWrapper from '../../../utilities/fetchWrapper';

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

const Team = (props) => {
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

    clientWrapper(`teams/teamsList`).then(async (result) => {
      const datas = await result;

      if (!!datas.teamsList && mounted) {
        setTeamState({
          type: actionTypes.setTeamList,
          payload: datas.teamsList,
        });
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const options = setTeamsOptions(teamState.teamList);
    setTeamState({
      type: actionTypes.setFilters,
      payload: options,
    });
    setTeamState({
      type: actionTypes.setActiveFilters,
      payload: options.map((team) => team.wording),
    });
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

  function toggleSidebar(type = 'default') {
    const types = {
      member: (
        <SidebarNewMember
          teamsOptions={teamState.filters.teamName}
          onSubmitFns={{
            success: (datas) => {
              setTeamState({ type: actionTypes.setTeamList, payload: datas });
            },
            clear: () => {
              setTeamState({ type: actionTypes.clearSidebarState });
            },
          }}
        />
      ),
      filters: (
        <SidebarFilters
          teamsNames={teamState.filters.teamName}
          postes={teamState.filters.postes}
        />
      ),
      team: (
        <SidebarNewTeam
          onSubmitFns={{
            success: (datas) => {
              setTeamState({ type: actionTypes.setTeamList, payload: datas });
            },
            clear: () => {
              setTeamState({ type: actionTypes.clearSidebarState });
            },
          }}
        />
      ),
      default: null,
    };

    return types[type];
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

  const TeamsNamesFilters = () =>
    teamState.filters.teamName.map(({ value, wording }) => (
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
    ));

  const TeamsMembersList = () =>
    teamState.teamList.map(({ _id: teamId, name, members, location }) => {
      if (teamState.activeFilters.includes(name)) {
        return members.map(
          ({ _id, firstname, lastname, email, hours, poste, contract }) => (
            <TeamMemberCard
              key={_id}
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
    });

  const Teams = ({ children }) => (
    <div className="teams">
      <h2>Mes équipes</h2>
      <div className="teams__filters">
        <p>Afficher: </p>
        {TeamsNamesFilters()}
      </div>
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
        <ul className="teams__listBody">{children}</ul>
      </div>
    </div>
  );

  return (
    <Fragment>
      <TeamsNav
        teamsMembersLength={[teamState.teamList.length, getMembersLength()]}
        filterTeamsFn={() => setSidebarStateType('filters')}
        addNewTeamMemberFn={() => setSidebarStateType('member')}
        createTeamFn={() => setSidebarStateType('team')}
      />
      <Teams>{TeamsMembersList()}</Teams>
      {teamState.sidebarState === 'show'
        ? toggleSidebar(teamState.sidebarType)
        : null}
    </Fragment>
  );
};

export default Team;
