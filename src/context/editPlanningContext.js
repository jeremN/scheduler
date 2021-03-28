import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';

import * as types from '../types/types';

import { useClient } from './authContext';

const PlanningContext = createContext();
PlanningContext.displayName = 'PlanningContext';

const defaultPlanningState = {
  startHours: '',
  endHours: '',
  startDate: '',
  endDate: '',
  team: [],
  content: [],
  title: '',
};

const defaultContextMenuState = {
  show: false,
  selectedDay: '',
  selectedEmployee: '',
  endHour: '',
  startHour: '',
};

const planningReducer = (currentState, action) => {
  switch (action.type) {
    case types.UPDATE_PLANNING_TEAM:
      return {
        ...currentState,
        team: action.team,
      };
    case types.UPDATE_PLANNING_CONTENT:
      return {
        ...currentState,
        content: action.content,
      };
    case types.SET_PLANNING_STATE:
      return {
        ...currentState,
        ...action.newState,
      };
    default:
      return currentState;
  }
};

function PlanningProvider(props) {
  const client = useClient();
  const [planningState, setPlanningState] = useReducer(
    planningReducer,
    defaultPlanningState
  );
  const [contextMenu, setContextMenu] = useState(defaultContextMenuState);

  const loadPlanning = useCallback(
    async (planningId) => {
      client(`plannings/planning/${planningId}`).then(async (result) => {
        const datas = await result;
        console.debug('edited planning: ', datas);

        if (datas.planning) {
          setPlanningState({
            type: types.SET_PLANNING_STATE,
            newState: datas.planning,
          });
        } else {
          throw new Error(
            `An error occurred while trying to get planning with id: ${planningId}, please reload the page`
          );
        }
      });
    },
    [client]
  );

  const savePlanning = useCallback(
    async (planningId, form) => {
      client(`/editPlanning/${planningId}`, { method: 'PUT', body: form }).then(
        async (result) => {
          const datas = await result;

          if (datas.status && datas.status === 404) {
            throw new Error(
              `Could not find any planning with id: ${planningId}`
            );
          }

          if (datas.status && datas.status === 403) {
            throw new Error('You are not authorized to edit this planning');
          }

          if (datas.planning) {
            setPlanningState({
              type: types.SET_PLANNING_STATE,
              newState: datas.planning,
            });
          } else {
            throw new Error(
              `An error occurred while trying to save planning with id: ${planningId}`
            );
          }
        }
      );
    },
    [client]
  );

  const addEmployeeSchedule = useCallback(
    ({ id, plannedDay, startHour, endHour, pauseStartHour, pauseEndHour }) => {
      const scheduleObj = {
        startHour,
        endHour,
        pauseStartHour,
        pauseEndHour,
        day: plannedDay,
      };
      console.debug('schedule obj', scheduleObj);
      const updatePlanningContent = [...planningState.content];
      const employeeIndex = updatePlanningContent.findIndex(
        ({ _id }) => _id === id
      );

      if (employeeIndex !== -1) {
        const dayIndex = updatePlanningContent[employeeIndex].planned.findIndex(
          ({ day }) => day === plannedDay
        );

        if (dayIndex !== -1) {
          const currentDay =
            updatePlanningContent[employeeIndex].planned[dayIndex];
          updatePlanningContent[employeeIndex].planned[dayIndex] = {
            ...currentDay,
            ...scheduleObj,
          };
        } else {
          updatePlanningContent[employeeIndex].planned.push(scheduleObj);
        }
      } else {
        updatePlanningContent.push({
          _id: id,
          planned: [scheduleObj],
        });
      }

      setPlanningState({
        type: types.UPDATE_PLANNING_CONTENT,
        content: updatePlanningContent,
      });
    },
    [planningState.content]
  );

  const toggleContextMenu = useCallback(
    (evt, day = '', employee = '') => {
      if (evt) evt.preventDefault();
      setContextMenu({
        show: !contextMenu.show,
        day,
        employee,
      });
    },
    [contextMenu.show]
  );

  const value = useMemo(
    () => ({
      planningState,
      setPlanningState,
      contextMenu,
      setContextMenu,
      loadPlanning,
      savePlanning,
      toggleContextMenu,
      addEmployeeSchedule,
    }),
    [
      contextMenu,
      planningState,
      loadPlanning,
      addEmployeeSchedule,
      savePlanning,
      toggleContextMenu,
    ]
  );

  return (
    <PlanningContext.Provider value={value}>
      {props.children}
    </PlanningContext.Provider>
  );
}

function useEditPlanning() {
  const context = useContext(PlanningContext);

  if (!context) {
    throw new Error('useEditPlanning must be used within an PlanningProvider');
  }

  return context;
}

export { PlanningProvider, useEditPlanning };
