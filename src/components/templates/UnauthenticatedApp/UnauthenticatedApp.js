import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from '../Layout/Layout';
import unauthenticatedRoutes from '../../../routes/unauthenticatedRoutes';

function AppRoutes() {
  return (
    <Switch>
      {unauthenticatedRoutes.map(({ path, components, exact }, index) => (
        <Route path={path} component={components} exact={exact} key={index} />
      ))}
      <Redirect to="/" />
    </Switch>
  );
}

function UnauthenticatedApp() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default UnauthenticatedApp;
