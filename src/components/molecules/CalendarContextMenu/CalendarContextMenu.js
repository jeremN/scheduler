import React, { useState } from 'react';
import DatePicker, { setDefaultLocale } from 'react-datepicker';

import Button from '../../atoms/Buttons/Buttons';
import SelectInput from '../../atoms/SelectInput/SelectInput';
import FormGroup from '../FormGroup/FormGroup';

import { getTimeOnly, dateFormatting } from '../../../utilities/utilities';

import 'react-datepicker/dist/react-datepicker.css';
import './CalendarContextMenu.scss';

setDefaultLocale('fr');

export default function CalendarContextMenu(props) {
  const [menuDatas, setMenuDatas] = useState({
    ...(props?.dayDatas ?? {
      employee: '',
      day: '',
      startHour: '',
      endHour: '',
      pauseStartHour: '',
      pauseEndHour: '',
    }),
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    const {
      employee,
      day,
      startHour,
      endHour,
      pauseEndHour,
      pauseStartHour,
    } = menuDatas;

    props.onSubmit({
      id: employee,
      fullname:
        evt.target.elements.employee[evt.target.elements.employee.selectedIndex]
          .innerHTML,
      plannedDay: dateFormatting(day),
      startHour: getTimeOnly(startHour),
      endHour: getTimeOnly(endHour),
      pauseEndHour: getTimeOnly(pauseEndHour),
      pauseStartHour: getTimeOnly(pauseStartHour),
    });

    props.onCancel();
  }

  function handleChange(event, fieldName, fieldValue) {
    let currentValue = event?.target.value ?? fieldValue;
    let currentName = event?.target.name ?? fieldName;

    setMenuDatas({
      ...menuDatas,
      [currentName]: currentValue,
    });
  }
  console.debug('contextMenu', menuDatas);

  return (
    <form className="calendarContextMenu" onSubmit={handleSubmit}>
      <div className="calendarContextMenu__header">
        {props.isOnHover ? <Button type="button">Effacer</Button> : null}
        <FormGroup
          labelId="designatedEmployee"
          wording="Employé"
          isRequired={true}
          modifiers={['column']}>
          <SelectInput
            id="designatedEmployee"
            name="employee"
            value={menuDatas.employee}
            optionsArray={[
              { wording: 'choisir un(e) employé(e)', value: '' },
              ...props?.members.map(({ firstname, lastname, poste, _id }) => ({
                wording: `${firstname} ${lastname}`,
                value: _id,
                others: `data-employee-poste="${poste}"`,
              })),
            ]}
            onChangeFn={handleChange}
          />
        </FormGroup>
        <div className="calendarContextMenu__poste">{menuDatas.poste}</div>
      </div>
      <div className="calendarContextMenu__body">
        <div className="form__inline calendarContextMenu__day">
          <FormGroup
            labelId="attributedDay"
            wording="Jour"
            isRequired={true}
            modifiers={['column']}>
            <DatePicker
              id="attributedDay"
              className="form__field"
              name="attributedDay"
              selected={menuDatas?.day}
              onChange={(date) => handleChange(null, 'day', date)}
              startDate={menuDatas?.day}
              dateFormat="dd/MM/yyyy"
            />
          </FormGroup>
        </div>
        <div className="form__inline calendarContextMenu__hours">
          <FormGroup
            labelId="attributedStartHour"
            wording="Heure de début"
            isRequired={true}
            modifiers={['column']}>
            <DatePicker
              id="attributedStartHour"
              className="form__field"
              name="startHour"
              selected={menuDatas?.startHour}
              showTimeSelect
              showTimeSelectOnly
              onChange={(date) => handleChange(null, 'startHour', date)}
              locale="fr"
              timeIntervals={10}
              dateFormat="HH:mm"
              minTime={menuDatas?.startHour}
              maxTime={menuDatas?.endHour}
            />
          </FormGroup>
          <FormGroup
            labelId="attributedEndHour"
            wording="Heure de fin"
            isRequired={true}
            modifiers={['column']}>
            <DatePicker
              id="attributedEndHour"
              className="form__field"
              name="endHour"
              selected={menuDatas?.endHour}
              showTimeSelect
              showTimeSelectOnly
              onChange={(date) => handleChange(null, 'endHour', date)}
              locale="fr"
              timeIntervals={10}
              dateFormat="HH:mm"
              minTime={menuDatas?.startHour}
              maxTime={menuDatas?.endHour}
            />
          </FormGroup>
        </div>
        <div className="form__inline calendarContextMenu__pauseHours">
          <FormGroup
            labelId="pauseStartHour"
            wording="Début de pause"
            isRequired={true}
            modifiers={['column']}>
            <DatePicker
              id="pauseStartHour"
              className="form__field"
              name="pauseStart"
              selected={menuDatas?.pauseStartHour}
              showTimeSelect
              showTimeSelectOnly
              onChange={(date) => handleChange(null, 'pauseStartHour', date)}
              dateFormat="HH:mm"
              minTime={menuDatas?.startHour}
              maxTime={menuDatas?.endHour}
            />
          </FormGroup>
          <FormGroup
            labelId="pauseEndHour"
            wording="Fin de pause"
            isRequired={true}
            modifiers={['column']}>
            <DatePicker
              id="pauseEndHour"
              className="form__field"
              name="pauseEnd"
              selected={menuDatas?.pauseEndHour}
              showTimeSelect
              showTimeSelectOnly
              onChange={(date) => handleChange(null, 'pauseEndHour', date)}
              dateFormat="HH:mm"
              minTime={menuDatas?.startHour}
              maxTime={menuDatas?.endHour}
            />
          </FormGroup>
        </div>
        <div className="form__inline">
          <Button modifiers={['primary']} type="submit">
            Valider
          </Button>
          <Button type="button" clicked={props.onCancel}>
            Annuler
          </Button>
        </div>
      </div>
    </form>
  );
}
