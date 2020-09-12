import React from 'react';

import Card from '../../atoms/Card/Card';
import Avatar from '../../atoms/Avatar/Avatar';

import './TeamMemberCard.scss';

const TeamMemberCard = ({ member, onClickHandler = () => {} }, index) => (
  <Card 
    key={ member._id } 
    tag={ 'li' } 
    cardClasses={ ['member'] }>
    <div className="member__infos">
      <Avatar letter={ member.name.charAt(0) } />
      <span><b>{ member.name }</b> { member.email }</span>
    </div>
    <div className="member__poste">
      { member.poste }
    </div>
    <div className="member__contract">
      { member.contract }
    </div>
    <div className="member__hours">
      { member.hours }
    </div>
    <div className="member__teamName">
      { member.teamName }
    </div>
    <div className="member__shop">
      { member.shop }
    </div>
    <div className="member__notes">
      { member.notes }
    </div>
    <div className="member__actions">
      <svg 
        width="31" 
        height="6" 
        viewBox="0 0 31 6" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <circle cx="3.96118" cy="3" r="3" fill="#2B3858"/>
          <circle cx="15.9612" cy="3" r="3" fill="#2B3858"/>
          <circle cx="27.9612" cy="3" r="3" fill="#2B3858"/>
        </g>
        <defs>
          <clipPath id="clip0">
            <rect x="0.961182" width="30" height="6" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  </Card>
);

export default TeamMemberCard;