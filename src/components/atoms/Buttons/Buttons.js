import React from 'react';

import {
  formattedClasses,
  formattedModifiers
} from '../../../utilities/utilities';

import './Buttons.scss';

const Buttons = ({ children, clicked, tag = 'button', modifiers = null, type = 'button', classes = null }) => {
  const BtnTag = `${tag}`; 
  const btnModifiers = formattedModifiers('button', modifiers);
  const btnClasses = formattedClasses(classes);

  return (
    <BtnTag 
      onClick={ clicked }
      className={ `button ${btnModifiers} ${btnClasses}` }
      type={ type } >
      { children }
    </BtnTag>
  );
}

export default Buttons;