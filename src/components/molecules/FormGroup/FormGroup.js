import React from 'react';

import {
  formattedClasses,
  formattedModifiers
} from '../../../utilities/utilities';

import './FormGroup.scss';

const FormGroup = ({ 
  children, 
  wording, 
  labelId, 
  labelClass, 
  labelModif, 
  modifiers, 
  classes, 
  fieldMsg , 
  isRequired = false
}) => {
  const formGroupModifiers = formattedModifiers('form__group', modifiers);
  const formGroupClasses = formattedClasses(classes);
  const labelModifiers = formattedModifiers('form__label', labelModif);
  const labelClasses = formattedClasses(labelClass);

  return (
    <div className={ `form__group ${formGroupModifiers} ${formGroupClasses}` }>
      <label 
        htmlFor={ labelId } 
        className={ `form__label ${labelModifiers} ${labelClasses}` }>
        { wording } {isRequired ? <small>(requis)</small> : '' }
      </label>
      { children }
      <div className="form__fieldMsg">{ fieldMsg }</div>
    </div>
  );
}

export default FormGroup;