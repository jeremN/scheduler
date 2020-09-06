import React from 'react';

import Brand from '../../molecules/Brand/Brand';
import MainNavigation from '../../molecules/MainNavigation/MainNavigation';

import './Header.scss';

const Header = props => {
  return (
    <header className="header">
      <Brand />
      <MainNavigation />
      <div className="helpers">
        <form className="helpers__search"></form>
        <ul className="helpers__list"></ul>
      </div>
    </header>
  );
}

export default Header;