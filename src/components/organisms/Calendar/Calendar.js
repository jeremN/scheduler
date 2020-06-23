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
    let hoursLen = end.diff(start, 'minutes') / 60;
    const minutePxValue =  (dimensions.h - 50) / end.diff(start, 'minutes');
    const hours = [];

    let loopStart = moment(startHours, hoursFormat);
    let loopEnd = moment(startHours, hoursFormat);
    let roundedStart = moment(startHours, hoursFormat);
    let roundedEnd = moment(startHours, hoursFormat);

    if (start.minutes != '00') {
      loopStart = 60 - start.minutes();
      roundedStart = start.add(1, 'hour').startOf('hour');
    }

    if (end.minutes != '00') {
      loopEnd = end.minutes();
      roundedEnd = end.startOf('hour');
    }
    hours.push(loopStart)

    console.debug(start, end)
    for (let index = 0; index < hoursLen; index++) {
      hours.push(moment(roundedStart, hoursFormat).add(index, 'hours').format(hoursFormat));
    }

    if (hours[hours.length - 1] !== loopEnd) {
      hours.push(loopEnd)
    }
    console.debug(hours)
    return { hoursTotal: hoursLen, pxValue: minutePxValue, hours: hours, hoursLimit: [start, end] };
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
    const { hours, pxValue, hoursLimit } = getHoursLength();
    const hourStyle = {
      height: pxValue * 60
    };
    
    return (
      <Fragment>
        <ul className="calendar__hoursList">
          { hours.map((hour, index) => {

            if (!Number.isNaN(hour)) {
              hourStyle.height = pxValue * hour;
            }
            console.debug(!Number.isNaN(hour) ? moment(hoursLimit[index === 0 ? 0 : 1], hoursFormat).format(hoursFormat) : moment(hour, hoursFormat).format(hoursFormat))
            return (
              <li 
                key={ !Number.isNaN(hour) ? moment(hoursLimit[index === 0 ? 0 : 1], hoursFormat).format(hoursFormat) : moment(hour, hoursFormat).format(hoursFormat) } 
                className="calendar__hour" 
                style={ hourStyle }>{ !Number.isNaN(hour) ? '' : moment(hour, hoursFormat).format('HH[h]mm') }</li>
            );
          }) }
        </ul>
      </Fragment>
    );
  }, [startHours, endHours]);

  const setWeekBlock = useMemo(() => {
    const weekArray = getWeekLength();
    const { hours, pxValue, hoursTotal } = getHoursLength();
    const hourStyle = {
      height: pxValue * 60
    };

    return (
      <Fragment>
        { weekArray.map((day) => (
          <div key={ moment(day, dayFormat).format(dayFormat) } className="calendar__dateBlock">
            <p className="calendar__date">{ moment(day, dayFormat).format('dddd') } <b>{ moment(day, dayFormat).format('DD') }</b></p>
            <ul className="calendar__dropzone">
            { hours.map((hour) => (
              <li key={ moment(hour, hoursFormat).format(hoursFormat) } className="calendar__hourBlock" style={ hourStyle }></li>
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