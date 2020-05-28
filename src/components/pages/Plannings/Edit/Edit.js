import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../organisms/Header/Header';
import EditPlanningNav from '../../../organisms/EditPlanningNavigation/EditPlanningNavigation';
import Calendar from '../../../organisms/Calendar/Calendar';

import './Edit.scss';

const EditPlanning = props => {
  // const edit

  return (
    <Fragment>
      <EditPlanningNav />
      <Calendar>
      </Calendar>
    </Fragment>
  );
};

export default EditPlanning;
