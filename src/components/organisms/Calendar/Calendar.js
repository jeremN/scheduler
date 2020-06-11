import React, { 
  useMemo,
  useLayoutEffect,
  useEffect,
  useRef, 
  useState,
  Fragment
} from 'react';

import moment from 'moment';

import './Calendar.scss';

const Calendar = props => {
  const {
    startHours,
    endHours,
    startDate,
    endDate,
  } = props;

  const hoursFormat = 'HH:mm:ss';
  const dayFormat = 'DD/MM/YYYY';
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({});

  const testDimensions = () => {
    if (targetRef.current) {
      const { width, height } = targetRef.current.getBoundingClientRect();
      setDimensions({
        w: width,
        h: height
      });
    }
  }

  useLayoutEffect(() => {
    testDimensions();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      testDimensions();
    });
  }, []);

  const getHoursLength = () => {
    const start = moment(startHours, hoursFormat);
    const end = moment(endHours, hoursFormat);
    const hoursLen = end.diff(start, 'minutes') / 60;
    const minutePxValue = end.diff(start, 'minutes') / (dimensions.h - 50);
    const hours = [];

    for (let index = 0; index < hoursLen; index++) {
      hours.push(moment(start, hoursFormat).add(index, 'hours').format(hoursFormat));
    }

    console.debug(hours, start, end, minutePxValue)
    
    return { hoursTotal: hoursLen, pxValue: minutePxValue, hours: hours };
  }
  
  const getWeekLength = () => {
    const start = moment(startDate, dayFormat);
    const end = moment(endDate, dayFormat);
    const diff = end.diff(start, 'day') + 1;
    const dates = [];

    for (let index = 0; index < diff; index++) {
      dates.push(moment(start, dayFormat).add(index, 'days').format(dayFormat));
    }
    return dates;
  }

  const setHoursBlock = useMemo(() => {
    const hoursObject = getHoursLength();

    return (
      <Fragment>
        <ul className="calendar__hoursList">
          { hoursObject.hours.map((hour) => (
            <li key={ moment(hour, hoursFormat).format(hoursFormat) } className="calendar__hour">{ moment(hour, hoursFormat).format('HH[h]mm') }</li>
            ))
          }
        </ul>
      </Fragment>
    );
  }, [startHours, endHours]);

  const setWeekBlock = useMemo(() => {
    const weekArray = getWeekLength();
    const hoursObject = getHoursLength();

    return (
      <Fragment>
        { weekArray.map((day) => (
          <div key={ moment(day, dayFormat).format(dayFormat) } className="calendar__dateBlock">
            <p className="calendar__date">{ moment(day, dayFormat).format('dddd') } <b>{ moment(day, dayFormat).format('DD') }</b></p>
            <ul className="calendar__dropzone">
            { hoursObject.hours.map((hour) => (
              <li key={ moment(hour, hoursFormat).format(hoursFormat) } className="calendar__hourBlock"></li>
              ))
            }
            </ul>
          </div>
          ))
        }
      </Fragment>
    );
  }, [startDate, endDate, startHours, endHours]);

  return (
    <div className="calendar" ref={ targetRef }>
      <div className="calendar__hoursBlock">
        { setHoursBlock }
      </div>
      <div className="calendar__datesBlock">
        { setWeekBlock }
      </div> 
      { props.children }
    </div>      
  );
}

export default Calendar;