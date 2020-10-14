import React from 'react';

import Buttons from '../../atoms/Buttons/Buttons';
import Icon from '../../atoms/Icon/Icon';

import './TeamsNav.scss';

const TeamsNav = ({
  filterTeamsFn = () => {},
  addNewTeamMemberFn = () => {},
  createTeamFn = () => {},
  teamsMembersLength = [0, 0],
}) => (
  <div className="teamsNavigations">
    <div className="teamsNavigations__leftBlock">
      <div className="teamsNavigations__length">
        <b>{teamsMembersLength[0]}</b>{' '}
        {teamsMembersLength[0] > 1 ? 'équipes' : 'équipe'}
      </div>
      <div className="teamsNavigations__length">
        <b>{teamsMembersLength[1]}</b>{' '}
        {teamsMembersLength[1] > 1 ? 'équipiers' : 'équipier'}
      </div>
    </div>
    <div className="teamsNavigations__rightBlock">
      <Buttons clicked={createTeamFn}>
        <Icon>
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.7857 6.28571H10.3214V1.14286C10.3214 0.511786 9.77766 0 9.10714 0H7.89286C7.22234 0 6.67857 0.511786 6.67857 1.14286V6.28571H1.21429C0.543772 6.28571 0 6.7975 0 7.42857V8.57143C0 9.2025 0.543772 9.71429 1.21429 9.71429H6.67857V14.8571C6.67857 15.4882 7.22234 16 7.89286 16H9.10714C9.77766 16 10.3214 15.4882 10.3214 14.8571V9.71429H15.7857C16.4562 9.71429 17 9.2025 17 8.57143V7.42857C17 6.7975 16.4562 6.28571 15.7857 6.28571Z"
              fill="#788590"
            />
          </svg>
        </Icon>
        créer une équipe
      </Buttons>
      <Buttons clicked={addNewTeamMemberFn}>
        <Icon>
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.7857 6.28571H10.3214V1.14286C10.3214 0.511786 9.77766 0 9.10714 0H7.89286C7.22234 0 6.67857 0.511786 6.67857 1.14286V6.28571H1.21429C0.543772 6.28571 0 6.7975 0 7.42857V8.57143C0 9.2025 0.543772 9.71429 1.21429 9.71429H6.67857V14.8571C6.67857 15.4882 7.22234 16 7.89286 16H9.10714C9.77766 16 10.3214 15.4882 10.3214 14.8571V9.71429H15.7857C16.4562 9.71429 17 9.2025 17 8.57143V7.42857C17 6.7975 16.4562 6.28571 15.7857 6.28571Z"
              fill="#788590"
            />
          </svg>
        </Icon>
        créer un équipier
      </Buttons>
      <Buttons clicked={filterTeamsFn}>
        <Icon>
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.9232 0H0.685578C0.0773203 0 -0.229605 0.808312 0.20138 1.28034L5.47826 7.06065V13.5C5.47826 13.7447 5.58728 13.9741 5.77034 14.1144L8.05295 15.8638C8.50328 16.2091 9.13043 15.8592 9.13043 15.2494V7.06065L14.4074 1.28034C14.8376 0.80925 14.5327 0 13.9232 0Z"
              fill="#788590"
            />
          </svg>
        </Icon>
        Filtrer
      </Buttons>
    </div>
  </div>
);

export default TeamsNav;
