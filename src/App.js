import React, { createContext } from 'react';
import { withRouter } from 'react-router-dom';

import Layout from './components/templates/Layout/Layout';
import Routes from './components/templates/Routes/Routes';

import useAuth from './hooks/isAuthenticated.';

import './App.scss';

export const AuthContext = createContext(); 

function App (props) {

  return (
    <AuthContext.Provider value={{ ...useAuth() }}>
      <div className="App">
        <Layout>
          <Routes />
        </Layout>
      </div>
    </AuthContext.Provider>
  );
}

export default withRouter(App);
