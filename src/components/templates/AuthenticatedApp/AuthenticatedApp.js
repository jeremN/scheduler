import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from '../Layout/Layout';
import authenticatedRoutes from '../../../routes/authenticatedRoutes';

function AppRoutes() {
  return (
    <Switch>
      {authenticatedRoutes.map(({ path, components, exact }, index) => (
        <Route path={path} component={components} exact={exact} key={index} />
      ))}
    </Switch>
  );
}

function AuthenticatedApp() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default AuthenticatedApp;
