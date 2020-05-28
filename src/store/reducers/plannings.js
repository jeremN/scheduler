import * as aT from '../actions/actionTypes';
import { updateObject } from '../../utilities/utilities';

const initialState = {
  appState: '',
  error: null,
  message: '',
  planningList: [],
  loadedPlanning: {
    id: '',
    title: '',
    shop: '',
    startDate: '',
    endDate: '',
    startHour: '',
    endHour: '',
    members: []
  }
}

const setAppState = (state, { appState }) => {
  return updateObject(state, {
    error: null,
    appState,
  })
}

const setError = (state, { error }) => {
  return updateObject(state, {
    error, 
    appState: 'error', 
  })
}

const setNewPlanningSuccess = (state, { planningID }) => {
  return updateObject(state, {
    loadedPlanning: {
      id: planningID
    },
    appState: '',
  })
}

const setNewPlanning = (state, { loadedPlanning }) => {
  return updateObject(state, {
    loadedPlanning,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case aT.SET_NEW_PLANNING: return setNewPlanning(state, action);
    case aT.SET_NEW_PLANNING_SUCCESS: return setNewPlanningSuccess(state, action);
    case aT.SET_ERROR: return setError(state, action);
    case aT.SET_APP_STATE: return setAppState(state, action);
    default:
      return state;
  }
}

export default reducer;