import React, { Fragment } from 'react';

import Header from '../../../organisms/Header/Header';
import EditPlanningNav from '../../../organisms/EditPlanningNavigation/EditPlanningNavigation';
import Calendar from '../../../organisms/Calendar/Calendar';

import './Edit.scss';

const EditPlanning = props => {
  return (
    <Fragment>
      <EditPlanningNav />
      <Calendar>
      </Calendar>
    </Fragment>
  );
};

export default EditPlanning;
