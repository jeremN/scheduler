import * as aT from '../actions/actionTypes';
import { updateObject } from '../../utilities/utilities';

const initialState = {
  appState: '',
  error: null,
  planningsList: [],
  newPlanning: {
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

const getPlanningsList = (state, action) => {

}

const setNewPlanningStart = (state, action) => {
  return updateObject(state, {
    error: null,
    appState: 'loading'
  })
}

const setNewPlanning = (state, action) => {

}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;