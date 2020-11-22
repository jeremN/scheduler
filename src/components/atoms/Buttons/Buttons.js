import React from 'react';

import { formattedModifiers } from '../../../utilities/utilities';

import './Buttons.scss';

const Buttons = ({
  children,
  clicked,
  tag = 'button',
  modifiers = null,
  type = 'button',
  classes = '',
}) => {
  const BtnTag = `${tag}`;
  const btnModifiers = formattedModifiers('button', modifiers);
  return (
    <BtnTag
      onClick={clicked}
      className={`button ${btnModifiers} ${classes}`}
      type={type}>
      {children}
    </BtnTag>
  );
};

export default Buttons;
