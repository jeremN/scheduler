import React from 'react';

import './MemberActionsPopup.scss';

const MemberActionsPopup = props => {
  return (
    <div className="MemberActionPopup">
      { props.children }
    </div>
  );
}

export default MemberActionsPopup;