import React from 'react';

import {
  formattedClasses,
  formattedModifiers,
} from '../../../utilities/utilities';

import './Card.scss';

const Card = ({
  tag = 'div',
  modifiers = null,
  classes = null,
  children,
  ...props
}) => {
  const cardModifiers = formattedModifiers('card', modifiers);
  const cardClasses = formattedClasses(classes);
  const CardTag = `${tag}`;

  return (
    <CardTag className={`card ${cardModifiers} ${cardClasses}`} {...props}>
      {children}
    </CardTag>
  );
};

export default Card;
