import { useReducer, useCallback } from 'react';

export const initialState = {
  isAuth: false,
  error: null,
  userId: null,
  token: null,
  loading: false,
  remainingTime: 0
}

export const authReducer = (currentState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.debug('LOGIN', action.payload)      
      return {
        ...currentState,
        ...action.payload,
        isAuth: true,
        loading: false,
        error: null
      };
    case 'ERROR':
      return {
        ...currentState,
        loading: false,
        error: action.errorMsg
      };
    case 'CLEAR':
      localStorage.clear();
      return initialState;
    default:
      return currentState;
  }
}

const useAuth = () => {
  const [authState, dispatchAuth] = useReducer(authReducer, initialState);
  
  const logoutHandler = useCallback(() => {
    console.debug('logout')
    dispatchAuth({
      type: 'CLEAR'
    })
  }, []);

  const autoLogoutHandler = (milliseconds = 60 * 60 * 1000) => {
    console.debug('auto logout', milliseconds)
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  }
  
  const loginHandler = useCallback((payload) => {
    dispatchAuth({
      type: 'LOGIN', 
      payload: payload
    })
  }, []);

  return {
    isAuthenticated: authState.isAuth,
    isLoading: authState.loading,
    state: authState,
    login: loginHandler,
    autoLogout: autoLogoutHandler,
    logout: logoutHandler,
  }
}

export default useAuth;