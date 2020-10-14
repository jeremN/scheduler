import React from 'react';

import './Avatar.scss';

import {
  formattedModifiers
} from '../../../utilities/utilities';

const Avatar = ({ letter, modifiers = ['default'] }) => {
  const avatarModifiers = formattedModifiers('avatar', modifiers); 

  return (
    <span className={ `avatar ${avatarModifiers}` }>
      { letter }
    </span>    
  );
}

export default Avatar;