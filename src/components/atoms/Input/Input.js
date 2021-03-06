import React from 'react';

import { formattedModifiers } from '../../../utilities/utilities';

import './Input.scss';

const Input = ({
  id,
  type = 'text',
  classes = '',
  modifiers = [],
  name = '',
  value = '',
  onChangeFn = null,
  ...props
}) => {
  return (
    <input
      id={id}
      className={`form__field ${formattedModifiers(
        'form__field',
        modifiers
      )} ${classes}`}
      type={type}
      name={name ? name : id}
      value={value}
      onChange={onChangeFn}
      {...props}
    />
  );
};

export default Input;
