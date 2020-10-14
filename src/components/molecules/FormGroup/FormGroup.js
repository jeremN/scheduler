import React from 'react';

import Label from '../../atoms/Label/Label';

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

  return (
    <div className={ `form__group ${formGroupModifiers} ${formGroupClasses}` }>
      <Label 
        labelId={ labelId }
        modifiers={ labelModif }
        classes={ labelClass }
        isRequired={ isRequired }>
        { wording }
      </Label>
      { children }
      <div className="form__fieldMsg">{ fieldMsg }</div>
    </div>
  );
}

export default FormGroup;