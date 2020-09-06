import React, { 
  createContext,
  useEffect,
 } from 'react';
import { withRouter } from 'react-router-dom';

import Layout from './components/templates/Layout/Layout';
import Routes from './components/templates/Routes/Routes';

import useAuth from './hooks/isAuthenticated.';

import './App.scss';

export const AuthContext = createContext(); 

function App (props) {
  const { 
    isAuthenticated,
    autoLogout, 
    logout,
    login,
    state,
  } = useAuth();

  useEffect(() => {
    async function isUserAuthenticated () {
      const token = localStorage.getItem('_scheduler_token');
      const expireDate = localStorage.getItem('_scheduler_expire_date');
  
      if (!token || !expireDate) return;
  
      if (new Date(expireDate) <= new Date()) {
        logout();
        return;
      }
      
      const userId = localStorage.getItem('_scheduler_user_id');
      const remainingMs = new Date(expireDate).getTime() - new Date().getTime();
  
      await login({
        userId: userId,
        token: token,
        remainingTime: remainingMs
      });
    
      props.history.push('/home');
    }
    isUserAuthenticated()
  }, [login, logout, props.history])

  useEffect(() => {
    if (isAuthenticated) {
      autoLogout(state.remainingTime)
    }
  }, [isAuthenticated, autoLogout, state.remainingTime])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, state }}>
      <div className="App">
        <Layout>
          <Routes />
        </Layout>
      </div>
    </AuthContext.Provider>
  );
}

export default withRouter(App);
