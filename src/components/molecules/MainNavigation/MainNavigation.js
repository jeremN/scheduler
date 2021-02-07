import React from 'react';

import NavigationItem from '../../atoms/NavigationLink/NavigationLink';
import { useAuth } from '../../../context/authContext';

import './MainNavigation.scss';

const AuthenticatedNavigation = () => {
  const authenticatedLinks = [
    {
      to: 'home',
      wording: 'Accueil',
      exact: true,
    },
    {
      to: 'team',
      wording: 'Equipe',
      exact: true,
    },
    {
      to: 'plannings',
      wording: 'Plannings',
      exact: true,
    },
    {
      to: 'settings',
      wording: 'Paramètres',
      exact: true,
    },
  ];

  return (
    <ul className="menu__list list">
      {authenticatedLinks.map(({ to, icon, wording, exact }) => (
        <li key={`route_to_${to}`}>
          <NavigationItem
            linkTo={`/${to}`}
            currentClasses={`menu__link list__link ${
              icon ? 'link--withIcon' : ''
            }`}
            activeClass={'menu__link__active'}
            isExact={exact}>
            {icon ? (
              <span
                className="menu__linkIcon list__linkIcon"
                aria-hidden="true">
                {icon}
              </span>
            ) : (
              ''
            )}
            {wording}
          </NavigationItem>
        </li>
      ))}
    </ul>
  );
};

const UnauthenticatedNavigation = () => {
  const unauthenticatedLinks = [
    {
      to: 'signup',
      wording: "S'inscrire",
      exact: true,
    },
    {
      to: 'signin',
      wording: 'Se connecter',
      exact: true,
    },
  ];

  return (
    <ul className="menu__list list">
      {unauthenticatedLinks.map(({ to, icon, wording, exact }) => (
        <li key={`route_to_${to}`}>
          <NavigationItem
            linkTo={`/${to}`}
            currentClasses={`menu__link list__link ${
              icon ? 'link--withIcon' : ''
            }`}
            activeClass={'menu__link__active'}
            isExact={exact}>
            {icon ? (
              <span
                className="menu__linkIcon list__linkIcon"
                aria-hidden="true">
                {icon}
              </span>
            ) : (
              ''
            )}
            {wording}
          </NavigationItem>
        </li>
      ))}
    </ul>
  );
};

const MainNavigation = () => {
  const { user } = useAuth();

  return (
    <nav className="menu" role="navigation">
      {user ? <AuthenticatedNavigation /> : <UnauthenticatedNavigation />}
    </nav>
  );
};

export default MainNavigation;
