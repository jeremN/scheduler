import React from 'react';
import { Link } from 'react-router-dom';

import { formattedModifiers } from '../../../utilities/utilities';

import '../Buttons/Buttons.scss';

const ButtonLink = ({
  linkTo,
  linkId,
  children,
  linkClasses = '',
  modifiers = [],
}) => {
  const mod = formattedModifiers('button', modifiers);

  return (
    <Link to={linkTo} id={linkId} className={`button ${linkClasses} ${[mod]}`}>
      {children}
    </Link>
  );
};

export default ButtonLink;
