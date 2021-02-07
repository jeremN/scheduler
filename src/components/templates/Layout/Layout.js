import React, { Fragment } from 'react';

import Header from '../../organisms/Header/Header';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
