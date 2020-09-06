import React from 'react';

import './Card.scss';

const Card = ({ tag = 'div', modifiers = null, classes = null, children }) => {
  const cardModifiers = Array.isArray(modifiers) && modifiers.length ? modifiers.map(modifier => `card--${modifier}`).join(' ') : '';
  const cardClasses = Array.isArray(classes) && classes.length ? classes.join(' ') : '';
  const CardTag = `${tag}`;

  return (
    <CardTag className={ `card ${cardModifiers} ${cardClasses}` }>
      { children }
    </CardTag>
  );
}

export default Card;