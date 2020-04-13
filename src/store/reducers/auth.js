import * as aT from '../actions/actionTypes';

const initialState = {
  appstate: null,
  token: null,
  user: null,
  redirectPath: '/'
}

const authStart = (state, action) => {}

const authSuccess = (state, action) => {}

const authFail = (state, action) => {}

const authLogout = (state, action) => {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;