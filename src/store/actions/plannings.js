import * as actionTypes from './actionTypes';

export const setNewPlanningStart = () => {
  return {
    appState: 'loading',
    type: actionTypes.SET_APP_STATE
  }
}

export const setNewPlanningSuccess = (data) => {
  return {
    appState: '',
    newPlanning: data,
    type: actionTypes.SET_NEW_PLANNING_SUCCESS,
  }
}

export const setNewPlanningFail = (error) => {
  return {
    error: error,
    type: actionTypes.SET_ERROR,
  }
}

export const setNewPlanning = (planningData) => {
  return dispatch => {
    dispatch(setNewPlanningStart());

    const url = `${process.env.REACT_APP_API_ENDPOINT}/plannings/newPlanning`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        newPlanning: {
          ...planningData,
          status: 'wip'
        }
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        dispatch(setNewPlanningFail());
      })
      .then((result) => {
        console.debug('setNewPlanning action', result);
        dispatch(setNewPlanningSuccess(result));
      })
      .catch((error) => {
        dispatch(setNewPlanningFail());
      })
  }
}

