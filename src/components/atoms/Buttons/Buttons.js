import React from 'react';

import './Buttons.scss';

const Buttons = ({ children, clicked, tag = 'button', modifiers = null, type = 'button', classes = null }) => {
  const BtnTag = `${tag}`; 
  const btnModifiers = Array.isArray(modifiers) && modifiers.length ? modifiers.map(modifier => `button--${modifier}`).join(' ') : '';
  const btnClasses = Array.isArray(classes) && classes.length ? classes.join(' ') : '';

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