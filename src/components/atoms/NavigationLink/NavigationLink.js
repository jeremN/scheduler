import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationLink = ({ linkTo, isExact, activeClass, currentClasses, children }) => {

  return (
    <NavLink
      to={ linkTo }
      exact={ isExact }
      activeClassName={ activeClass }
      className={ [currentClasses].join(' ') }>
      { children }
    </NavLink>
  );
}

export default NavigationLink;