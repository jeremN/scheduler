import React from 'react';

import './Avatar.scss';

const Avatar = ({ letter, modifiers = ['avatar--default'] }) => {
  const avatarModifiers = Array.isArray(modifiers) && modifiers.length ? modifiers.join(' ') : modifiers; 

  return (
    <span className={ `avatar ${avatarModifiers}` }>
      { letter }
    </span>    
  );
}

export default Avatar;