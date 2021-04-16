import React from 'react';

import './Avatar.scss';

import { formattedModifiers } from '../../../utilities/utilities';

const Avatar = ({
  letter,
  modifiers = ['default'],
  randomColor = '',
  ...props
}) => {
  const avatarModifiers = formattedModifiers('avatar', modifiers);

  return (
    <span
      className={`avatar ${avatarModifiers}`}
      style={randomColor ? { background: randomColor } : null}
      {...props}>
      {letter}
    </span>
  );
};

export default Avatar;
