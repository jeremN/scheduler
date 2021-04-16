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
            onRightClick(evt, {
              day: new Date(moment(day, 'DD/MM/yyyyTHH:mm:ss').utc()),
            })
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
  memberHeight,
  memberIndex,
  memberTopPosition,
  dayIndex,
  pauseHeight,
  pauseTopPosition,
  contextDatas = {},
  onRightClick = () => {},
  ...props
}) {
  const memberStyles = {
    width: `calc(((100% / 7) / ${memberLength}) - 20px)`,
    height: `${memberHeight}px`,
    margin: '0 10px',
    position: 'absolute',
    left: `calc(((100% / 7) * ${dayIndex}) + ((((100% / 7) / ${memberLength}) - 20px) * ${memberIndex}) + (${memberIndex} * 20px))`,
    top: `calc(50px + ${memberTopPosition}px)`,
    backgroundColor: 'blue',
    borderRadius: '8px',
  };
  const pauseStyles = {
    width: '100%',
    height: `${pauseHeight}px`,
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    top: `${pauseTopPosition}px`,
    left: 0,
  };

  return (
    <div
      className="calendar__scheduledBlock"
      style={memberStyles}
      onContextMenu={(evt) =>
        onRightClick(evt, {
          ...contextDatas,
          day: new Date(moment(contextDatas.day, 'DD/MM/yyyyTHH:mm:ss').utc()),
        })
      }>
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
          onRightClick={onRightClick}
        />
        {planningState.content.map(({ _id, memberId, planned }) => {
          const memberLength = planningState.team[0].members.length;
          const memberIndex = planningState.team[0].members.findIndex(
            (member) => member._id === memberId
          );

          return planned.map(
            ({ pauseStartHour, pauseEndHour, endHour, startHour, day }) => {
              const workDuration = moment(endHour, hoursFormat).diff(
                moment(startHour, hoursFormat),
                'minutes'
              );

              const workTopPos = moment(startHour, hoursFormat).diff(
                moment(hours[0].loopKey, hoursFormat),
                'minutes'
              );

              const pauseDuration = moment(pauseEndHour, hoursFormat).diff(
                moment(pauseStartHour, hoursFormat),
                'minutes'
              );
              const pauseTopPos = moment(pauseStartHour, hoursFormat).diff(
                moment(startHour, hoursFormat),
                'minutes'
              );

              const dayIndex = weekArray.findIndex(
                (weekday) => weekday === day
              );

              console.debug(pauseTopPos, pxValue, dayIndex);
              return (
                <CalendarScheduledBlocks
                  key={`draggable_${_id}_${day}`}
                  contextDatas={{
                    day,
                    pauseStartHour,
                    pauseEndHour,
                    employee: memberId,
                  }}
                  onRightClick={onRightClick}
                  memberLength={memberLength}
                  memberIndex={memberIndex}
                  memberTopPosition={workTopPos}
                  dayIndex={dayIndex}
                  pauseHeight={pxValue * pauseDuration}
                  pauseTopPosition={pxValue * pauseTopPos}
                  memberHeight={pxValue * workDuration}
                />
              );
            }
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
