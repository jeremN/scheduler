import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  formattedClasses,
  formattedModifiers
} from '../../../utilities/utilities';

const NavigationLink = ({ linkTo, isExact, activeClass, currentClasses, children }) => (
  <NavLink
    to={ linkTo }
    exact={ isExact }
    activeClassName={ activeClass }
    className={ [currentClasses].join(' ') }>
    { children }
  </NavLink>
);

export default NavigationLink;