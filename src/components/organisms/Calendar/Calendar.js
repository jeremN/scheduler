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

function CalendarWeekBlocks({ weekArray, hoursObj, onRightClick, children }) {
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
          {children}
        </div>
      ))}
    </>
  );
}

function CalendarScheduledBlocks({
  memberLength,
  pauseHeight,
  memberHeight,
  pauseTopPosition,
  ...props
}) {
  const memberStyles = {
    width: `calc(((100% / 7) / ${memberLength}) - 10px)`,
    height: `${memberHeight}px`,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'blue',
    borderRadius: '4px',
  };
  const pauseStyles = {
    width: '100%',
    height: `${pauseHeight}px`,
    backgroundColor: 'grey',
    position: 'absolute',
    top: `${pauseTopPosition}px`,
    left: 0,
  };

  return (
    <div className="calendar__scheduledBlock" style={memberStyles}>
      <div className="calendar__pauseBlock" style={pauseStyles}></div>
    </div>
  );
}

function Calendar({ dimensions, onRightClick = () => {} }) {
  const { planningState } = useEditPlanning();

  const { getHoursLength, getWeekLength } = useCalendar(dimensions, {
    dayFormat,
    startHours: planningState.startHours,
    endHours: planningState.endHours,
    startDate: planningState.startDate,
    endDate: planningState.endDate,
  });
  const weekArray = getWeekLength();
  const { hours, pxValue } = getHoursLength();

  return (
    <div className="calendar">
      <div className="calendar__hoursBlock">
        <CalendarHoursBlock hoursObj={hours} />
      </div>
      <div className="calendar__datesBlock">
        <CalendarWeekBlocks
          weekArray={weekArray}
          hoursObj={hours}
          onRightClick={onRightClick}>
          {planningState.content.map(({ _id, planned }) => {
            const memberLength = planningState.team[0].members.length;

            return planned.map(
              ({ pauseStartHour, pauseEndHour, endHour, startHour }) => {
                const workDuration = moment(endHour, hoursFormat).diff(
                  moment(startHour, hoursFormat),
                  'minutes'
                );
                const pauseDuration = moment(pauseEndHour, hoursFormat).diff(
                  moment(pauseStartHour, hoursFormat),
                  'minutes'
                );
                const pauseTopPos = moment(pauseStartHour, hoursFormat).diff(
                  moment(startHour, hoursFormat)
                );
                return (
                  <CalendarScheduledBlocks
                    key={`draggable_${_id}`}
                    memberLength={memberLength}
                    pauseHeight={pxValue * pauseDuration}
                    pauseTopPosition={pxValue * pauseTopPos}
                    memberHeight={pxValue * workDuration}
                  />
                );
              }
            );
          })}
        </CalendarWeekBlocks>
      </div>
    </div>
  );
}

export default Calendar;
