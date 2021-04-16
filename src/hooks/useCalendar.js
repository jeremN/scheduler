import { useCallback } from 'react';

import moment from 'moment';

function useCalendar(
  dimensions,
  {
    endHours,
    startHours,
    endDate,
    startDate,
    dayFormat = 'DD/MM/YYYY',
    hoursFormat = 'HH:mm:ss',
  } = {}
) {
  const getHoursLength = useCallback(() => {
    const start = moment(startHours, hoursFormat);
    const end = moment(endHours, hoursFormat);
    let hoursLen = end.diff(start, 'minutes') / 60;
    const minutePxValue =
      (dimensions.height - 50 - 68 - 92) / end.diff(start, 'minutes');
    const hours = [];

    let loopStart = moment(startHours, hoursFormat);
    let loopEnd = moment(startHours, hoursFormat);
    let roundedStart = moment(startHours, hoursFormat);

    if (start.minutes !== '00') {
      loopStart = 60 - start.minutes();
      roundedStart = moment(start, hoursFormat).add(1, 'hour').startOf('hour');
    }

    if (end.minutes !== '00') {
      loopEnd = end.minutes();
    }

    hours.push({
      loopKey: moment(start, hoursFormat).format(hoursFormat),
      content: '',
      pxHeight: minutePxValue * loopStart,
    });

    for (let index = 0; index < hoursLen; index++) {
      const hour = moment(roundedStart, hoursFormat)
        .add(index, 'hours')
        .format(hoursFormat);
      hours.push({
        loopKey: hour,
        content: moment(hour, hoursFormat).format('HH[h]mm'),
        pxHeight: minutePxValue * 60,
      });
    }

    if (hours[hours.length - 1] !== loopEnd) {
      hours.push({
        loopKey: moment(end).format(hoursFormat),
        content: '',
        pxHeight: minutePxValue * loopEnd,
      });
    }

    return { hoursTotal: hoursLen, pxValue: minutePxValue, hours: hours };
  }, [dimensions.height, endHours, hoursFormat, startHours]);

  const getWeekLength = useCallback(() => {
    const start = moment(startDate, dayFormat);
    const end = moment(endDate, dayFormat);
    const diff = end.diff(start, 'day') + 1;
    const dates = [];

    for (let index = 0; index < diff; index++) {
      dates.push(moment(start, dayFormat).add(index, 'days').format(dayFormat));
    }

    return dates;
  }, [startDate, dayFormat, endDate]);

  return { getHoursLength, getWeekLength };
}

export { useCalendar };
