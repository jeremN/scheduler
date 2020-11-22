import React from 'react';

import { formattedModifiers } from '../../../utilities/utilities';

import './Checkbox.scss';

const Checkbox = ({
  id,
  type = 'text',
  classes = '',
  modifiers = [],
  name = '',
  checked = '',
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
      checked={checked}
      onChange={onChangeFn}
      {...props}
    />
  );
};

export default Checkbox;
