import React, { Suspense, lazy } from 'react';

import { useAuth } from './context/authContext';
import FullPageLoader from './components/organisms/FullPageLoader/FullPageLoader';

import './App.scss';

const AuthenticatedApp = lazy(() =>
  import(
    /* webpackPrefetch: true */ './components/templates/AuthenticatedApp/AuthenticatedApp'
  )
);
const UnauthenticatedApp = lazy(() =>
  import('./components/templates/UnauthenticatedApp/UnauthenticatedApp')
);

function App() {
  const { user } = useAuth();
  return (
    <Suspense fallback={<FullPageLoader />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
}

export default App;
