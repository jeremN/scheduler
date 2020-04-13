import * as aT from './actionTypes.js';

export const authStart = () => ({
  type: aT.AUTH_START
})

export const logout = () => {
  return {
    type: aT.AUTH_LOGOUT
  }
}

export const auth = () => {}