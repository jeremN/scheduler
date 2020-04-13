import React from 'react';

import './Icon.scss';

const Icon = ({ children, tag = 'span', modifiers = null, classes = null }) => {
  const IconTag = `${tag}`;
  const iconModifiers = Array.isArray(modifiers) && modifiers.length ? modifiers.map(modifier => `icon--${modifier}`).join(' ') : '';
  const iconClasses = Array.isArray(classes) && classes.length ? classes.join(' ') : '';

  return (
    <IconTag className={ `icon ${iconModifiers} ${iconClasses}` }>
      { children }
    </IconTag>
  );
}

export default Icon;