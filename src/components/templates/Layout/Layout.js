import React, { Fragment } from 'react';

import Sidedrawer from '../../organisms/Sidedrawer/Sidedrawer';
import Header from '../../organisms/Header/Header';

const Layout = props => {
  return (
    <Fragment>
      <Sidedrawer />
      <main>
        <Header pageTitle={ "Dashboard" } />
        { props.children }
      </main>
    </Fragment>
  );
}

export default Layout;