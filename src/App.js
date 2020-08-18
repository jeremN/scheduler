import React, { createContext } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './components/templates/Layout/Layout';

import useAuth from './hooks/isAuthenticated.';

import routes from './routes/routes';
import './App.scss';

export const AuthContext = createContext(); 

function App (props) {
  const appRoutes = (
    <Switch>
      { routes.map(({ path, components, exact, display }, index) => ( 
          <Route 
            key={ index }
            path={ path }
            component={ components }
            exact={ exact } />
        ) 
      )}
      <Redirect to="/" />
    </Switch>
  )

  return (
    <div className="App">
      <AuthContext.Provider value={{ ...useAuth }}>
      <Layout>
        { appRoutes }
      </Layout>
      </AuthContext.Provider>
    </div>
  );
}

export default withRouter(App);
