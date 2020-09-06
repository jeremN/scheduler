import React, { useContext } from 'react';

import NavigationItem from '../../atoms/NavigationLink/NavigationLink';
import { AuthContext } from '../../../App';

import './MainNavigation.scss';

const MainNavigation = props => {
  const { isAuthenticated } = useContext(AuthContext);
  const showOnAuth = ['isAuth', 'always'];
  const showNotAuth = ['notAuth', 'always'];

  const list = [
    {
      to: 'home',
      wording: 'Accueil',
      exact: true,
      display: 'isAuth'
    },
    {
      to: 'team',
      wording: 'Equipe',
      exact: true,
      display: 'isAuth'
    },
    {
      to: 'plannings',
      wording: 'Plannings',
      exact: true,
      display: 'isAuth'
    },
    {
      to: 'settings',
      wording: 'Paramètres',
      exact: true,
      display: 'isAuth'
    },
    /*{
      to: '',
      wording: 'Déconnexion',
      exact: false,
      icon: (<svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.8749 2.95859C25.3203 5.41953 27.5624 9.44453 27.5624 14C27.5624 21.4813 21.5031 27.5461 14.0273 27.5625C6.56245 27.5789 0.448386 21.4922 0.437449 14.0219C0.43198 9.46641 2.67417 5.43047 6.11401 2.96406C6.75386 2.51016 7.64526 2.70156 8.02807 3.38516L8.89214 4.92188C9.21479 5.49609 9.06167 6.22344 8.5312 6.61719C6.26167 8.30156 4.81245 10.9703 4.81245 13.9945C4.80698 19.0422 8.88667 23.1875 13.9999 23.1875C19.0093 23.1875 23.2203 19.1297 23.1874 13.9398C23.171 11.107 21.8367 8.37266 19.4632 6.61172C18.9328 6.21797 18.7851 5.49063 19.1078 4.92188L19.9718 3.38516C20.3546 2.70703 21.2406 2.50469 21.8749 2.95859ZM16.1874 14.4375V1.3125C16.1874 0.585156 15.6023 0 14.8749 0H13.1249C12.3976 0 11.8124 0.585156 11.8124 1.3125V14.4375C11.8124 15.1648 12.3976 15.75 13.1249 15.75H14.8749C15.6023 15.75 16.1874 15.1648 16.1874 14.4375Z" fill="white"/></svg>),
      display: 'isAuth'
    },*/
    {
      to: 'signup',
      wording: 'S\'inscrire',
      exact: true,
      display: 'notAuth'
    },
    {
      to: 'signin',
      wording: 'Se connecter',
      exact: true,
      display: 'notAuth'
    }
  ]

  return (
    <nav className="menu" role="navigation">
      <ul className="menu__list list">
        { list.map(({ to, icon, wording, exact, display }) => {
          if ((isAuthenticated && showOnAuth.includes(display)) 
          || (!isAuthenticated && showNotAuth.includes(display))) { 
            return (
              <li>
                <NavigationItem
                  key={ `route_to_${to}` }
                  linkTo={ `/${to}`}
                  currentClasses={ `menu__link list__link ${icon ? 'link--withIcon' : '' }` }
                  activeClass={ 'menu__link__active' }
                  isExact={ exact }>
                  { icon ? <span className="menu__linkIcon list__linkIcon" aria-hidden="true">
                    { icon }
                  </span> : '' }
                  { wording }
                </NavigationItem>
              </li>
            ) 
          }
          return null
        }) }
      </ul>
    </nav>
  );
}

export default MainNavigation;