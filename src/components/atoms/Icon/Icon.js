import React from 'react';

import {
  formattedClasses,
  formattedModifiers
} from '../../../utilities/utilities';

import './Icon.scss';

const Icon = ({ children, tag = 'span', modifiers = null, classes = null }) => {
  const IconTag = `${tag}`;
  const iconModifiers = formattedModifiers('icon', modifiers);
  const iconClasses = formattedClasses(classes);

  return (
    <IconTag className={ `icon ${iconModifiers} ${iconClasses}` }>
      { children }
    </IconTag>
  );
}

export default Icon;