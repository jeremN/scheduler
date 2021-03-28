import React from 'react';
import moment from 'moment';

import { useCalendar } from '../../../hooks/useCalendar';
import { useEditPlanning } from '../../../context/editPlanningContext';

import './Calendar.scss';

const hoursFormat = 'HH:mm:ss';
const dayFormat = 'DD/MM/YYYY';

function CalendarHoursBlock({ hoursObj }) {
  return (
    <ul className="calendar__hoursList">
      {hoursObj.map(({ loopKey, pxHeight, content }, hourIndex) => (
        <li key={`${loopKey}_${hourIndex}`} style={{ height: `${pxHeight}px` }}>
          {content}
        </li>
      ))}
    </ul>
  );
}

function CalendarWeekBlocks({ weekArray, hoursObj, onRightClick }) {
  return (
    <>
      {weekArray.map((day, weekIndex) => (
        <div
          key={moment(day, dayFormat).format(dayFormat)}
          className="calendar__dateBlock"
          onContextMenu={(evt) =>
            onRightClick(
              evt,
              new Date(moment(day, 'DD/MM/yyyyTHH:mm:ss').utc()),
              ''
            )
          }>
          <p className="calendar__date">
            {moment(day, dayFormat).format('dddd')}{' '}
            <b>{moment(day, dayFormat).format('DD')}</b>
          </p>
          <ul className="calendar__dropzone">
            {hoursObj.map(({ loopKey, pxHeight }, hourIndex) => (
              <li
                key={`${loopKey}_${weekIndex}_${hourIndex}`}
                className="calendar__hourBlock"
                style={{ height: `${pxHeight}px` }}></li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function Calendar({ dimensions, children, onRightClick = () => {} }) {
  const { planningState } = useEditPlanning();

  const { getHoursLength, getWeekLength } = useCalendar(dimensions, {
    dayFormat,
    startHours: planningState.startHours,
    endHours: planningState.endHours,
    startDate: planningState.startDate,
    endDate: planningState.endDate,
  });
  const weekArray = getWeekLength();
  const { hours } = getHoursLength();

  return (
    <div className="calendar">
      <div className="calendar__hoursBlock">
        <CalendarHoursBlock hoursObj={hours} />
      </div>
      <div className="calendar__datesBlock">
        <CalendarWeekBlocks
          weekArray={weekArray}
          hoursObj={hours}
          onRightClick={onRightClick}
        />
      </div>
      {children}
    </div>
  );
}

export default Calendar;
