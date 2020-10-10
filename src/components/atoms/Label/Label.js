import React from 'react';

import {
  formattedClasses,
  formattedModifiers
} from '../../../utilities/utilities';

import './Label.scss';

const Label = ({ 
  children, 
  labelId, 
  modifiers, 
  classes, 
  isRequired = false
}) => {
  const labelModifiers = formattedModifiers('form__label', modifiers);
  const labelClasses = formattedClasses(classes);

  return (
      <label 
        htmlFor={ labelId } 
        className={ `form__label ${labelModifiers} ${labelClasses}` }>
        { children } {isRequired ? <small>(requis)</small> : '' }
      </label>
  );
}

export default Label;