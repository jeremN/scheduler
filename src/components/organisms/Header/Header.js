import React from 'react';

import './Header.scss';

const Header = props => {
  return (
    <header className="header">
      <h2>{ props.pageTitle }</h2>
    </header>
  );
}

export default Header;