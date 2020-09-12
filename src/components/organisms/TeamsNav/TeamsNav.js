import React from 'react';

import Buttons from '../../atoms/Buttons/Buttons';
import Icon from '../../atoms/Icon/Icon';
import Select from '../../atoms/SelectInput/SelectInput';

import './TeamsNav.scss';

const TeamsNav = props => {
  const { 
    onFilterChange,
    showByOptionsArray, 
    defaultFilterValue,
    teamLen = 0,
  } = props;

  return (
     <div className="teamsNavigations">
      <div className="teamsNavigations__leftBlock">
         <div className="teamsNavigations__length">
          <b>{ teamLen }</b> équipiers 
         </div>
         <div className="teamsNavigations__showBy">
           <label htmlFor="showBy">Afficher par:</label>
           <Select 
            id={ 'showBy' } 
            name={ 'filterListBy' } 
            value={ defaultFilterValue } 
            optionsArray={ showByOptionsArray }
            onChangeFn={ onFilterChange } />
         </div>
       </div>
       <div className="teamsNavigations__rightBlock">
        <Buttons>
          <Icon>
            <svg 
              width="17" 
              height="16" 
              viewBox="0 0 17 16" 
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7857 6.28571H10.3214V1.14286C10.3214 0.511786 9.77766 0 9.10714 0H7.89286C7.22234 0 6.67857 0.511786 6.67857 1.14286V6.28571H1.21429C0.543772 6.28571 0 6.7975 0 7.42857V8.57143C0 9.2025 0.543772 9.71429 1.21429 9.71429H6.67857V14.8571C6.67857 15.4882 7.22234 16 7.89286 16H9.10714C9.77766 16 10.3214 15.4882 10.3214 14.8571V9.71429H15.7857C16.4562 9.71429 17 9.2025 17 8.57143V7.42857C17 6.7975 16.4562 6.28571 15.7857 6.28571Z" fill="#788590"/>
            </svg>
          </Icon>
          ajouter un membre
        </Buttons>
        <Buttons>
          <Icon>
            <svg 
              width="15" 
              height="16" 
              viewBox="0 0 15 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M12.8333 6V2.41406C12.8333 2.14875 12.7368 1.89469 12.5649 1.70687L11.2684 0.292812C11.0965 0.105312 10.8634 0 10.6202 0H2.75C2.24383 0 1.83333 0.447812 1.83333 1V6C0.820703 6 0 6.89531 0 8V11.5C0 11.7762 0.205104 12 0.458333 12H1.83333V15C1.83333 15.5522 2.24383 16 2.75 16H11.9167C12.4228 16 12.8333 15.5522 12.8333 15V12H14.2083C14.4616 12 14.6667 11.7762 14.6667 11.5V8C14.6667 6.89531 13.846 6 12.8333 6ZM11 14H3.66667V11H11V14ZM11 7H3.66667V2H9.16667V3.5C9.16667 3.77625 9.37177 4 9.625 4H11V7ZM12.375 9.25C11.9954 9.25 11.6875 8.91406 11.6875 8.5C11.6875 8.08562 11.9954 7.75 12.375 7.75C12.7546 7.75 13.0625 8.08562 13.0625 8.5C13.0625 8.91406 12.7546 9.25 12.375 9.25Z" fill="#788590"/>
            </svg>
          </Icon>
          imprimer
        </Buttons>
        <Buttons>
          <Icon>
            <svg 
              width="15" 
              height="16" 
              viewBox="0 0 15 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M13.9232 0H0.685578C0.0773203 0 -0.229605 0.808312 0.20138 1.28034L5.47826 7.06065V13.5C5.47826 13.7447 5.58728 13.9741 5.77034 14.1144L8.05295 15.8638C8.50328 16.2091 9.13043 15.8592 9.13043 15.2494V7.06065L14.4074 1.28034C14.8376 0.80925 14.5327 0 13.9232 0Z" fill="#788590"/>
            </svg>
          </Icon>
          Filtrer
        </Buttons>
       </div>
     </div>
  );
}

export default TeamsNav;