import React from 'react';

import './CardHeading.scss';

const CardHeading = props => {
  const modifiers = Array.isArray(props.modifiers) && props.modifiers.length ? props.modifiers.map(modifier => `cardHeading--${modifier}`).join(' ') : '';

  return (
    <div className={ `cardHeading ${modifiers}`}>
      <h2>{ props.cardTitle }</h2>
      { props.children }
    </div>
  );
}

export default CardHeading;