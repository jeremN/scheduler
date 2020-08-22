const _localStorageKey = '_scheduler_token';

function clientWrapper (endpoint, { body, ...customConfig } = {}) {
  const token = localStorage.getItem(_localStorageKey);
  const headers = { 'Content-Type': 'application/json' };

  if (!!token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (!!body) {
    config.body = JSON.stringify(body);
  }
  
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/${endpoint}`, config)
    .then(async response => {
      const data = await response.json();
      console.debug('fetchWrapper: ', response, data)
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export default clientWrapper;