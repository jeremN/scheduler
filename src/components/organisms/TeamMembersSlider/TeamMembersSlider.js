import React from 'react';

import './TeamMembersSlider.scss';

const TeamMembersSlider = props => {
  return (
    <div className="teamMembers">
      <h2>Equipe</h2>
      <div className="teamMembers__slider">
        { props.children }
      </div>
    </div>
  );
}

export default TeamMembersSlider;