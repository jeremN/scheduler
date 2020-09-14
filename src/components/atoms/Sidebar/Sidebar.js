import React from 'react';

import {
  formattedClasses,
  formattedModifiers
} from '../../../utilities/utilities';

import './Sidebar.scss';

const Sidebar = props => {
  const sidebarModifiers = formattedModifiers('sidebar', props.modifiers);
  const sidebarClasses = formattedClasses(props.classes);

  return (
    <div className={ `sidebar ${sidebarModifiers} ${sidebarClasses}` }>
      <div className="sidebar__heading">
        { props.sidebarHeading }
      </div>
      <div className="sidebar__content">
        { props.children }
      </div>
      { props.sidebarFooter ? (<div className="sidebar__footer">{ props.sidebarFooter }</div>) : null }
    </div>
  );
}

export default Sidebar;