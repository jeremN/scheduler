import React from 'react';

import {
  formattedClasses,
  formattedModifiers
} from '../../../utilities/utilities';

import './SelectInput.scss';

const Select = ({ 
  id, 
  classes = [], 
  modifiers = [], 
  name = '', 
  value = '', 
  optionsArray = [],
  onChangeFn = null, 
}) => {
  const inputModifiers = formattedModifiers('form__field', modifiers);
  const inputClasses = formattedClasses(classes);

  return (
    <select 
      id={ id } 
      className={ `form__field ${inputModifiers} ${inputClasses}` }
      name={ name ? name : id }
      value={ value } 
      onChange={ onChangeFn }>
      { optionsArray.map((option, index) => (<option key={ option.value } value={ option.value }>{ option.wording }</option>)) }
    </select> 
  );
}

export default Select;