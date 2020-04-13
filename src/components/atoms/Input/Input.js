import React from 'react';

import {
  formattedClasses,
  formattedModifiers
} from '../../../utilities/utilities';

import './Input.scss';

const Input = ({ 
  id, 
  type = 'text', 
  classes = [], 
  modifiers = [], 
  name = '', 
  value = '', 
  onChangeFn = null, 
}) => {
  const inputModifiers = formattedModifiers('form__field', modifiers);
  const inputClasses = formattedClasses(classes);

  return (
    <input
      id={ id }
      className={ `form__field ${inputModifiers} ${inputClasses}` }
      type={ type } 
      name={ name ? name : id }
      value={ value }
      onChange={ onChangeFn } />
  );
}

export default Input;