import React from 'react';
import { Link } from 'react-router-dom';

import '../Buttons/Buttons.scss';

const ButtonLink = ({ linkTo, linkId, children, linkClasses, modifiers }) => {
  const mod = modifiers ? modifiers.map(modifier => `button--${modifier}`).join(' ') : '';

  return (
    <Link
      to={ linkTo }
      id={ linkId }
      className={ `button ${[linkClasses].join(' ')} ${[mod]}` }>
      { children }
    </Link>
  );
}

export default ButtonLink;