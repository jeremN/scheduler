import React, { Fragment, useEffect, useReducer } from 'react';

import TeamsNav from '../../organisms/TeamsNav/TeamsNav';
import TeamMemberCard from '../../molecules/TeamMemberCard/TeamMemberCard';

import {
  SidebarFilters,
  SidebarNewMember,
  SidebarNewTeam,
} from '../../organisms/TeamsSidebar/TeamsSidebar';

import clientWrapper from '../../../utilities/fetchWrapper';

import './Team.scss';

const Team = (props) => {
  const initialTeamState = {
    teamList: [],
    filters: {
      teamName: [],
      poste: [],
      contract: [],
    },
    sidebarState: 'hidden',
    sidebarType: 'default',
    newMemberForm: [
      {
        firstname: '',
        lastname: '',
        contract: '',
        hours: '',
        poste: '',
        email: '',
        teamID: '',
      },
    ],
    newTeam: {
      name: '',
      location: {
        city: '',
        address: '',
      },
      members: [
        {
          firstname: '',
          lastname: '',
          contract: '',
          hours: '',
          poste: '',
          email: '',
        },
      ],
    },
  };

  const teamReducer = (currentState, action) => {
    switch (action.type) {
      case 'SET_TEAM_LIST':
        return {
          ...currentState,
          teamList: action.payload,
        };
      case 'SET_SIDEBAR_STATE':
        return {
          ...currentState,
          sidebarState: action.payload.showSidebar,
          sidebarType: action.payload.type,
        };
      case 'SET_FILTERS':
        return {
          ...currentState,
          filters: action.payload,
        };
      case 'CLEAR_MEMBER_STATE':
        return {
          ...currentState,
          sidebarState: 'hidden',
          sidebarType: 'default',
          newMemberForm: [
            {
              firstname: '',
              lastname: '',
              teamID: '',
            },
          ],
        };
      case 'SET_MEMBER_STATE':
        return {
          ...currentState,
          newMemberForm: action.payload,
        };
      case 'CLEAR_TEAM_FORM':
        return {
          ...currentState,
          sidebarState: 'hidden',
          sidebarType: 'default',
          newTeam: {
            name: '',
            location: {
              city: '',
              address: '',
            },
            members: [
              {
                firstname: '',
                lastname: '',
              },
            ],
          },
        };
      case 'SET_TEAM_FORM':
        return {
          ...currentState,
          newTeam: action.payload,
        };
      default:
        return currentState;
    }
  };

  const [teamState, setTeamState] = useReducer(teamReducer, initialTeamState);

  useEffect(() => {
    let mounted = true;

    clientWrapper(`teams/teamsList`).then(async (result) => {
      const datas = await result;

      if (!!datas.teamsList && mounted) {
        console.debug('teamsArray', datas.teamsList);
        setTeamState({ type: 'SET_TEAM_LIST', payload: datas.teamsList });
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const optionsKeys = ['teamName', 'poste', 'contract'];

    function extractFiltersOptions(keysToFind, listToSort) {
      const baseObj = {
        teamName: [],
        poste: [],
        contract: [],
      };
      return listToSort.reduce((item, nextItem) => {
        Object.keys(nextItem).forEach((key) => {
          if (keysToFind.includes(key) && !item[key].includes(nextItem[key])) {
            item[key].push(nextItem[key]);
          }
        });
        return item;
      }, baseObj);
    }

    if (teamState.teamList.length) {
      const options = extractFiltersOptions(optionsKeys, teamState.teamList);
      console.debug('options', options);
      setTeamState({ type: 'SET_FILTERS', payload: options });
    }
  }, [teamState.teamList]);

  function setSidebarStateType(newType) {
    setTeamState({
      type: 'SET_SIDEBAR_STATE',
      payload: {
        showSidebar: teamState.sidebarState === 'hidden' ? 'show' : 'hidden',
        type: newType,
      },
    });
  }

  const callSidebarFilters = () => {
    setSidebarStateType('filters');
  };
  const callSidebarMember = () => {
    setSidebarStateType('member');
  };
  const callSidebarTeam = () => {
    setSidebarStateType('team');
  };

  const handleNewMemberChange = (evt, field = null, val = null) => {
    const memberIndex = evt.target.closest('.teamMember').dataset.memberIndex;
    const updatedMemberForm = [...teamState.newMemberForm];
    const fieldName = field ? field : evt.target.name;
    const fieldValue = val ? val : evt.target.value;

    updatedMemberForm[memberIndex][fieldName] = fieldValue;
    setTeamState({ type: 'SET_MEMBER_STATE', payload: updatedMemberForm });
  };

  const handleNewMemberSubmit = (e) => {
    e.preventDefault();
  };

  const handleNewTeamChange = (evt, field = null, val = null) => {
    const updatedTeamForm = { ...teamState.newTeam };
    const isLocation = ['city', 'address'];
    const isMember = [
      'firstname',
      'lastname',
      'contract',
      'hours',
      'poste',
      'email',
    ];

    const fieldName = field ? field : evt.target.name;
    const fieldValue = val ? val : evt.target.value;

    if (isLocation.includes(fieldName)) {
      updatedTeamForm.location = { ...teamState.newTeam.location };
      updatedTeamForm.location[fieldName] = fieldValue;
    } else if (isMember.includes(fieldName)) {
      const memberIndex = evt.target.closest('.teamMember').dataset.memberIndex;
      updatedTeamForm.members = [...teamState.newTeam.members];
      updatedTeamForm.members[memberIndex][fieldName] = fieldValue;
    } else {
      updatedTeamForm[fieldName] = fieldValue;
    }

    setTeamState({ type: 'SET_TEAM_FORM', payload: updatedTeamForm });
  };

  const handleNewTeamSubmit = (e) => {
    e.preventDefault();

    clientWrapper(`teams/newTeam`, {
      body: { newTeam: { ...teamState.newTeam } },
    })
      .then(async (result) => {
        const datas = await result;

        if (datas.newTeamID) {
          setTeamState({ type: 'SET_TEAM_LIST', payload: datas.teamsList });
        } else {
          throw new Error(
            'An error occured while trying to create your team, please try again'
          );
        }
      })
      .finally(() => {
        setTeamState({ type: 'CLEAR_TEAM_FORM' });
      });
  };

  function addNewMemberToMemberForm() {
    const updatedForm = [
      ...teamState.memberForm,
      {
        firstname: '',
        lastname: '',
        contract: '',
        hours: '',
        poste: '',
        email: '',
        teamID: '',
      },
    ];
    setTeamState({ type: 'SET_MEMBER_STATE', payload: updatedForm });
  }

  function addNewMemberToTeamForm() {
    const updatedForm = {
      ...teamState.newTeam,
      members: [
        ...teamState.newTeam.members,
        {
          firstname: '',
          lastname: '',
          contract: '',
          hours: '',
          poste: '',
          email: '',
        },
      ],
    };
    setTeamState({ type: 'SET_TEAM_FORM', payload: updatedForm });
  }

  function toggleSidebar(type = 'default') {
    const types = {
      member: (
        <SidebarNewMember
          memberForm={teamState.newMemberForm}
          handlesFn={{
            submit: handleNewMemberSubmit,
            change: handleNewMemberChange,
            addMember: addNewMemberToMemberForm,
          }}
          teamsOptions={teamState.filters.teamName}
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
          teamForm={teamState.newTeam}
          handlesFn={{
            submit: handleNewTeamSubmit,
            change: handleNewTeamChange,
            addMember: addNewMemberToTeamForm,
          }}
          teamsOptions={teamState.filters.teamName}
        />
      ),
      default: null,
    };

    return types[type];
  }

  const Teams = ({ children }) => (
    <div className="teams">
      <h2>Mes équipes</h2>
      <div className="teams__list">
        <ul className="teams__listHead">
          <li>Informations</li>
          <li>Poste</li>
          <li>Contrat</li>
          <li>Nombre d'heures</li>
          <li>Equipe</li>
          <li>Magasin</li>
          <li>Notes</li>
          <li>Actions</li>
        </ul>
        <ul className="teams__listBody">{children}</ul>
      </div>
    </div>
  );

  const getMembersLength = () => {
    let countMembers = 0;
    teamState.teamList.forEach(({ members }) => {
      countMembers += members.length;
    });

    return countMembers;
  };

  return (
    <Fragment>
      <TeamsNav
        teamsMembersLength={[teamState.teamList.length, getMembersLength()]}
        filterTeamsFn={callSidebarFilters}
        addNewTeamMemberFn={callSidebarMember}
        createTeamFn={callSidebarTeam}
      />
      <Teams>
        {teamState.teamList.map(({ name, members, location }) => {
          return members.map(
            ({
              _id,
              firstname,
              lastname,
              email,
              hours,
              notes,
              poste,
              contract,
            }) => (
              <TeamMemberCard
                key={_id}
                member={{
                  _id,
                  email,
                  hours,
                  poste,
                  contract,
                  shop: location.city || '',
                  teamName: name,
                  name: `${firstname} ${lastname}`,
                  note: notes[0],
                }}
              />
            )
          );
        })}
      </Teams>
      {teamState.sidebarState === 'show'
        ? toggleSidebar(teamState.sidebarType)
        : null}
    </Fragment>
  );
};

export default Team;
