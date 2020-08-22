import React from 'react';

const CalendarUnit = (props) => {
  return (
    <li className={ props.classe } style={ props.styles }>{ props.children }</li> 
  );
}