import React from 'react';

import Icon from '../../atoms/Icon/Icon';
import ButtonLink from '../../atoms/Link/Link';
import Buttons from '../../atoms/Buttons/Buttons';

import './TeammateNav.scss';

const TeammateNav = ({ editTeammateFn = () => {}, team = '', name = '' }) => {
  return (
    <div className="teammateNavigation">
      <div className="teammateNavigation__leftBlock">
        <ButtonLink linkTo="/team" modifiers={['simple']}>
          Equipe
        </ButtonLink>
        <span>{team}</span>
        <span>{name}</span>
      </div>
      <div className="teammateNavigation__rightBlock">
        <Buttons clicked={editTeammateFn}>
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
          Editer la fiche
        </Buttons>
      </div>
    </div>
  );
};

export default TeammateNav;
