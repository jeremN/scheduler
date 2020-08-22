import React, { 
  Fragment,
  useEffect,
  useReducer,
} from 'react';
import { useParams } from 'react-router-dom';

import EditPlanningNav from '../../../organisms/EditPlanningNavigation/EditPlanningNavigation';
import Calendar from '../../../organisms/Calendar/Calendar';

import './Edit.scss';

const EditPlanning = props => {
  let { id } = useParams();

  // TODO => replace shop by team (when team page will be available)
  const initialState = {
    startHours: '',
    endHours: '',
    startDate: '',
    endDate: '',
    shop: '',
    title: ''
  }

  const planningReducer = (currentState, action) => {
    switch (action.type) {
      case 'updateTeam':
        return {
          ...currentState,
          shop: action.shop
        };
      case 'updateContent':
        return {
          ...currentState,
          content: action.content
        };
      case 'setPlanningState':
        return {
          ...currentState, 
          ...action.newState
        };
      default:
        return currentState;
    }
  }

  const [planningState, dispatchPlanning] = useReducer(planningReducer, initialState);

  useEffect(() => {
    async function fetchPlanning() {
      const url = `${process.env.REACT_APP_API_ENDPOINT}/plannings/planning/${id}`;
      await fetch(url,{
        method: 'GET'
      })
        .then(response => response.json())
        .then(
          (result) => {
            console.debug('edit page', result)
            dispatchPlanning({
              type: 'setPlanningState',
              newState: result.planning
            })
          },
          (error) => {
            console.error('GET plannings list error', error);
          }
        )
     }
     fetchPlanning();
  }, []);

  return (
    <Fragment>
      <EditPlanningNav />
      <Calendar
        startHours={ planningState.startHours }
        endHours={ planningState.endHours }
        startDate={ planningState.startDate }
        endDate={ planningState.endDate } >
      </Calendar>
    </Fragment>
  );
};

export default EditPlanning;
