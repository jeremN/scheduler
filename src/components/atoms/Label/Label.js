import React from 'react';

import { formattedModifiers } from '../../../utilities/utilities';

import './Label.scss';

const Label = ({
  children,
  labelId,
  modifiers = [],
  classes = '',
  isRequired = false,
}) => {
  return (
    <label
      htmlFor={labelId}
      className={`form__label ${formattedModifiers(
        'form__label',
        modifiers
      )} ${classes}`}>
      {children} {isRequired ? <small>(requis)</small> : ''}
    </label>
  );
};

export default Label;
