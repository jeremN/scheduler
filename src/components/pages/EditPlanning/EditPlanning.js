import React, { useEffect } from 'react';

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
    run(loadPlanning());
  }, [run, loadPlanning]);
  console.debug('context menu bis', contextMenu);
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
                endHour:
                  contextMenu?.endHour ??
                  contextMenu.day.setHours(
                    ...planningState.endHours.split(':').map((value) => +value)
                  ),
                startHour:
                  contextMenu?.startHour ??
                  contextMenu.day.setHours(
                    ...planningState.startHours
                      .split(':')
                      .map((value) => +value)
                  ),
                employee: contextMenu?.employee ?? '',
                pauseStartHour: contextMenu?.pauseStartHour
                  ? contextMenu.day.setHours(
                      ...contextMenu.pauseStartHour
                        .split(':')
                        .map((value) => +value)
                    )
                  : '',
                pauseEndHour: contextMenu?.pauseEndHour
                  ? contextMenu.day.setHours(
                      ...contextMenu.pauseEndHour
                        .split(':')
                        .map((value) => +value)
                    )
                  : '',
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
