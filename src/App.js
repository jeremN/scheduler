import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './components/templates/Layout/Layout';

import routes from './routes/routes';
import './App.scss';

function App(props) {

  const appRoutes = (
    <Switch>
      { routes.map(({ path, components, exact, display }, index) => {
        let routeTag = ( 
          <Route 
            key={ index }
            path={ path }
            component={ components }
            exact={ exact } />
        );

        return routeTag;
      } )}
      <Redirect to="/" />
    </Switch>
  )


  return (
    <div className="App">
      <Layout>
        { appRoutes }
      </Layout>
    </div>
  );
}

export default withRouter(App);
