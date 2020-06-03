import React, { 
  Fragment,
  useEffect 
} from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../../organisms/Header/Header';
import EditPlanningNav from '../../../organisms/EditPlanningNavigation/EditPlanningNavigation';
import Calendar from '../../../organisms/Calendar/Calendar';

import './Edit.scss';

const EditPlanning = props => {
  let { id } = useParams();

  // TODO => replace shop by team (when team page will be available)
  const planningState = {
    startHours: '',
    endHours: '',
    startDate: '',
    endDate: '',
    shop: '',
    title: ''
  }
  const getHoursLength = (start, end) => {
    
  }

  const getDaysLength = (start, end) => {

  }

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_ENDPOINT}/plannings/planning/${id}`;
    fetch(url,{
      method: 'GET'
    })
      .then(response => response.json())
      .then(
        (result) => {
          console.debug('edit page', result)
          // setplanningsList(result.planningsList);
        },
        (error) => {
          console.error('GET plannings list error', error);
        }
      )
  }, []);

  return (
    <Fragment>
      <EditPlanningNav />
      <Calendar>
      </Calendar>
    </Fragment>
  );
};

export default EditPlanning;
