import React from 'react';

import styles from './MemberCard.module.scss'

const MemberCard = props => {
  return (
    <div className={ styles.memberCard }>
      <div className={ styles.memberCard__handle }>
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="2" fill="#AEAFB5"/>
          <circle cx="2" cy="8" r="2" fill="#AEAFB5"/>
          <circle cx="2" cy="14" r="2" fill="#AEAFB5"/>
          <circle cx="8" cy="2" r="2" fill="#AEAFB5"/>
          <circle cx="8" cy="8" r="2" fill="#AEAFB5"/>
          <circle cx="8" cy="14" r="2" fill="#AEAFB5"/>
        </svg>
      </div>
      <div className={ styles.memberCard__picture }></div>
      <div className={ styles.memberCard__content }>
        <h3>Lorem ipsum</h3>
        <p>Responsable</p>
      </div>
      <div className={ styles.memberCard__hours }>
        <span>24</span><span>35h</span>
      </div>
    </div>
  );
}

export default MemberCard;