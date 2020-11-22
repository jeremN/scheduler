import React from 'react';

import { formattedModifiers } from '../../../utilities/utilities';

import './Icon.scss';

const Icon = ({ children, tag = 'span', modifiers = null, classes = '' }) => {
  const IconTag = `${tag}`;
  const iconModifiers = formattedModifiers('icon', modifiers);

  return (
    <IconTag className={`icon ${iconModifiers} ${classes}`}>{children}</IconTag>
  );
};

export default Icon;
