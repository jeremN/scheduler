import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import FullPageErrorFallback from '../../organisms/FullPageErrorFallback/FullPageErrorFallback';
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
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Layout>
        <AppRoutes />
      </Layout>
    </ErrorBoundary>
  );
}

export default AuthenticatedApp;
