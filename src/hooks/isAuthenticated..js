import { useReducer } from 'react';

export const initialState = {
  isAuth: false,
  error: null,
  userId: null,
  token: null,
  loading: false,
}

export const authReducer = (currentState, action) => {
  switch (action.type) {
    case 'LOGIN':
      const { userID, token } = action.payload;
      const remainingMs = 60 * 60 * 1000;
      const expireDate = new Date(new Date().getTime() + remainingMs);
      localStorage.setItem('_scheduler_user_id', JSON.stringify(userID));
      localStorage.setItem('_scheduler_token', JSON.stringify(token));
      localStorage.setItem('_scheduler_expire_date', JSON.stringify(expireDate));
      
      return {
        ...currentState,
        isAuth: true,
        userId: userID,
        token: token
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

  const logoutHandler = () => {
    dispatchAuth({
      type: 'CLEAR'
    })
  }

  const autoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  }

  return {
    state: authState,
    dispatchState: dispatchAuth,
    autoLogout: autoLogout,
    logout: logoutHandler,
  }
}

export default useAuth;