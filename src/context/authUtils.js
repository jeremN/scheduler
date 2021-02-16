import client from '../utilities/client';

const localStorageKey = '__scheduler_stored_user__';

async function getStoredUser() {
  return window.localStorage.getItem(localStorageKey);
}

function storeUser(userData) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(userData));
}

function clearStoredUser() {
  window.localStorage.removeItem(localStorageKey);
}

async function login({ email, password }) {
  let user = null;

  return client('auth/login', { body: { email, password } }).then(
    async (result) => {
      const datas = await result;
      if (datas.status && datas.status === 422) {
        throw new Error('Validation failed');
      }

      if (datas.status && datas.status !== 200) {
        throw new Error('Could not authenticate you');
      }

      if (datas.userID) {
        const remainingMs = 120 * 60 * 1000;
        const expireDate = new Date(new Date().getTime() + remainingMs);
        user = {
          userId: datas.userID,
          token: datas.token,
          expireDate: expireDate,
          username: datas.username,
        };

        storeUser(user);
      }

      return user;
    }
  );
}

async function register({ email, firstname, lastname, password }) {
  return client('auth/signup', {
    body: { email, firstname, lastname, password },
  }).then((result) => {
    if (result.status && result.status === 422) {
      throw new Error('Validation failed');
    }

    if (result.status && result.status !== 201) {
      throw new Error('Could not authenticate you');
    }

    if (result.userID) {
      return result.userID;
    }
  });
}

export {
  getStoredUser,
  storeUser,
  clearStoredUser,
  localStorageKey,
  login,
  register,
};
