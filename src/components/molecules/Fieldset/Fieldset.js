import React from 'react';

import {
  formattedClasses,
  formattedModifiers
} from '../../../utilities/utilities';

import './Fieldset.scss';

const Fieldset = ({ 
  children, 
  modifiers, 
  classes, 
  fieldMsg, 
  legendHeading,
}) => {
  const formGroupModifiers = formattedModifiers('form__group', modifiers);
  const formGroupClasses = formattedClasses(classes);

  return (
    <div className={ `form__group ${formGroupModifiers} ${formGroupClasses}` }>
      { legendHeading ? (<legend>{ legendHeading }</legend>) : '' }
      { children }
      <div className="form__fieldMsg">{ fieldMsg }</div>
    </div>
  );
}

export default Fieldset;