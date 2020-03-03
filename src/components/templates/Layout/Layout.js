import React, { Fragment } from 'react';

import Sidedrawer from '../../organisms/Sidedrawer/Sidedrawer';
import Header from '../../organisms/Header/Header';

const Layout = props => {
  return (
    <Fragment>
      <Sidedrawer />
      <main>
        <Header />
        <div></div>
      </main>
    </Fragment>
  )
}

export default Layout;