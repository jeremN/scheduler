import React, {
  createContext,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import FullPageErrorFallback from '../components/organisms/FullPageErrorFallback/FullPageErrorFallback';
import FullPageLoader from '../components/organisms/FullPageLoader/FullPageLoader';

import client from '../utilities/client';
import * as auth from './authUtils';
import { useAsync } from '../hooks/useAsync';

async function bootstrapUserData() {
  let user = null;

  const storedUser = await auth.getStoredUser();
  if (storedUser !== null) {
    const { token, expireDate, userId } = JSON.parse(storedUser);

    if (token && expireDate && new Date(expireDate) >= new Date()) {
      const remainingMs = new Date(expireDate).getTime() - new Date().getTime();
      user = {
        userId,
        token,
        remainingTime: remainingMs,
      };
    }
  }

  return user;
}

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isSuccess,
    isError,
    run,
    setData,
  } = useAsync();
  let history = useHistory();

  const logout = useCallback(() => {
    auth.clearStoredUser();
    setData(null);
  }, [setData]);

  const autoLogout = useCallback(
    (remainingTime = 60 * 60 * 1000) => {
      setTimeout(() => {
        logout();
        history.push('/');
      }, remainingTime);
    },
    [logout]
  );

  useEffect(() => {
    const userDataPromise = bootstrapUserData();
    run(userDataPromise).then((user) => {
      if (user) {
        setData(user);
        autoLogout(user.remainingTime);
        history.push('/home');
      } else {
        history.push('/');
      }
    });
  }, [run, setData, history, autoLogout]);

  const login = useCallback(
    (form) =>
      auth.login(form).then((user) => {
        if (user) {
          setData(user);
          autoLogout(user.remainingTime);
          history.push('/home');
        }
      }),
    [setData, autoLogout, history]
  );

  const register = useCallback(
    (form) =>
      auth.register(form).then((userId) => {
        if (userId) {
          history.push('/signin');
        }
      }),
    [history]
  );

  const value = useMemo(
    () => ({ user, login, logout, register, autoLogout, setData }),
    [login, logout, register, user, autoLogout, setData]
  );

  if (isLoading || isIdle) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return (
      <AuthContext.Provider value={value}>
        {props.children}
      </AuthContext.Provider>
    );
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function useClient() {
  const { user } = useAuth();
  const token = user?.token;

  return useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}

const AuthWithRouterProvider = withRouter(AuthProvider);

export { AuthWithRouterProvider, useAuth, useClient };
