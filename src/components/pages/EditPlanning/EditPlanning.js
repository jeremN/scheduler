import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  PlanningProvider,
  useEditPlanning,
} from '../../../context/editPlanningContext';

import Loader from '../../atoms/Loader/Loader';
import ErrorMessage from '../../molecules/ErrorMessage/ErrorMessage';
import CalendarContextMenu from '../../molecules/CalendarContextMenu/CalendarContextMenu';
import EditPlanningNav from '../../organisms/EditPlanningNavigation/EditPlanningNavigation';
import Calendar from '../../organisms/Calendar/Calendar';

import { useAsync } from '../../../hooks/useAsync';
import { useGetBoundingRect } from '../../../hooks/useGetBoundingRect';

import './EditPlanning.scss';
// url test: http://localhost:3000/plannings/edit/603815eb29ff8e29304c158c

function EditedPlanning() {
  let { id } = useParams();
  const {
    planningState,
    contextMenu,
    toggleContextMenu,
    loadPlanning,
    addEmployeeSchedule,
  } = useEditPlanning();
  const { run, error, isError, isLoading, isSuccess } = useAsync();
  const [dimensions, targetRef] = useGetBoundingRect();

  useEffect(() => {
    run(loadPlanning(id));
  }, [run, id, loadPlanning]);

  return (
    <main ref={targetRef}>
      {isLoading ? <Loader /> : null}
      {isSuccess ? (
        <>
          <EditPlanningNav />
          {contextMenu.show ? (
            <CalendarContextMenu
              members={planningState.team[0]?.members}
              dayDatas={{
                day: contextMenu.day,
                endHour: contextMenu.day.setHours(
                  ...planningState.endHours.split(':').map((value) => +value)
                ),
                startHour: contextMenu.day.setHours(
                  ...planningState.startHours.split(':').map((value) => +value)
                ),
              }}
              onSubmit={addEmployeeSchedule}
              onCancel={toggleContextMenu}
            />
          ) : null}
          <Calendar
            dimensions={dimensions}
            onRightClick={toggleContextMenu}></Calendar>
        </>
      ) : null}
      {isError ? <ErrorMessage error={error} /> : null}
    </main>
  );
}

function EditPlanning() {
  return (
    <PlanningProvider>
      <EditedPlanning />
    </PlanningProvider>
  );
}

export default EditPlanning;
