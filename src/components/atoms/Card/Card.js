import React from 'react';

import {
  formattedClasses,
  formattedModifiers
} from '../../../utilities/utilities';

import './Card.scss';

const Card = ({ tag = 'div', modifiers = null, classes = null, children }) => {
  const cardModifiers = formattedModifiers('card', modifiers);
  const cardClasses = formattedClasses(classes);
  const CardTag = `${tag}`;

  return (
    <CardTag className={ `card ${cardModifiers} ${cardClasses}` }>
      { children }
    </CardTag>
  );
}

export default Card;