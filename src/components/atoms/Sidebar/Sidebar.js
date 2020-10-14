import React from 'react';

import {
  formattedClasses,
  formattedModifiers
} from '../../../utilities/utilities';

import './Sidebar.scss';

function Sidebar (props) {
  const sidebarModifiers = formattedModifiers('sidebar', props.modifiers);
  const sidebarClasses = formattedClasses(props.classes);

  return (
    <div className={ `sidebar ${sidebarModifiers} ${sidebarClasses}` }>
      { props.children }
    </div>
  );
}

function SidebarHeading (props) {
  return (
    <div className="sidebar__heading">{ props.children }</div>
  );
}

function SidebarContent (props) {
  return (
    <div className="sidebar__content">{ props.children }</div>
  );
}

export { Sidebar, SidebarHeading, SidebarContent };