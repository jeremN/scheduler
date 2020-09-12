import React, { 
  useContext
 } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '../../../routes/routes';

import { AuthContext } from '../../../App';

const showOnAuth = ['isAuth', 'always'];
const showNotAuth = ['notAuth', 'always'];

const Routes = props => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Switch>
      { routes.map(({ path, components, exact, display }, index) => {
        if ((isAuthenticated && showOnAuth.includes(display)) 
          || (!isAuthenticated && showNotAuth.includes(display))) {
          return ( 
            <Route 
              key={ index }
              path={ path }
              component={ components }
              exact={ exact } />
          );
        }
        return null
      } )}
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes;