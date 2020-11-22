import React from 'react';

import Label from '../../atoms/Label/Label';

import { formattedModifiers } from '../../../utilities/utilities';

import './FormGroup.scss';

const FormGroup = ({
  wording = '',
  modifiers = [],
  classes = '',
  isRequired = false,
  children,
  labelId,
  labelClass,
  labelModif,
  fieldMsg,
}) => (
  <div
    className={`form__group ${formattedModifiers(
      'form__group',
      modifiers
    )} ${classes}`}>
    <Label
      labelId={labelId}
      modifiers={labelModif}
      classes={labelClass}
      isRequired={isRequired}>
      {wording}
    </Label>
    {children}
    <div className="form__fieldMsg">{fieldMsg}</div>
  </div>
);

export default FormGroup;
