import moment from 'moment';

export const formattedModifiers = (baseClassName, modifiers = []) =>
  Array.isArray(modifiers) && modifiers.length
    ? modifiers.map((modifier) => `${baseClassName}--${modifier}`).join(' ')
    : '';

export const formattedClasses = (classes) =>
  Array.isArray(classes) && classes.length ? classes.join(' ') : '';

export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps,
});

export const generateRandomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

export const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getTimeOnly = (date, dateFormat = 'HH:mm:ss') => {
  let time = new Date(date);
  return moment(time).format(dateFormat);
};

export const dateFormatting = (date, dateFormat = 'DD/MM/YYYY') => {
  const currentDate = new Date(date);
  return moment(currentDate).format(dateFormat);
};
