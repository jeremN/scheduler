import React, { useState } from 'react';

import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Buttons/Buttons';
import Input from '../../atoms/Input/Input';
import FormGroup from '../../molecules/FormGroup/FormGroup';

const EditProfil = ({ initialState, onSubmit, onCancelFn }) => {
  const [editProfil, setEditProfil] = useState(initialState);

  function handleChange({ target }) {
    setEditProfil({
      ...editProfil,
      user: {
        ...editProfil.user,
        [target.name]: target.value,
      },
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(editProfil.user);
  }

  return (
    <Card classes={['teammate__edit']} tag={'form'} onSubmit={handleSubmit}>
      <Card classes={['teammate__infos']}>
        <FormGroup
          labelId={`teammate_firstname`}
          wording="Firstname"
          modifiers={['column']}>
          <Input
            id={`teammate_firstname`}
            type="text"
            name="firstname"
            value={editProfil.user.firstname}
            onChangeFn={handleChange}
          />
        </FormGroup>
        <FormGroup
          labelId={`teammate_lastname`}
          wording="Lastname"
          modifiers={['column']}>
          <Input
            id={`teammate_lastname`}
            type="text"
            name="lastname"
            value={editProfil.user.lastname}
            onChangeFn={handleChange}
          />
        </FormGroup>
      </Card>
      <Card classes={['teammate__profil']}>
        <FormGroup
          labelId={`teammate_email`}
          wording="Email"
          modifiers={['column']}>
          <Input
            id={`teammate_email`}
            type="email"
            name="email"
            value={editProfil.user.email}
            onChangeFn={handleChange}
          />
        </FormGroup>
        <FormGroup
          labelId={`teammate_poste`}
          wording="Poste"
          modifiers={['column']}>
          <Input
            id={`teammate_poste`}
            type="text"
            name="poste"
            value={editProfil.user.poste}
            onChangeFn={handleChange}
          />
        </FormGroup>
        <FormGroup
          labelId={`teammate_contract`}
          wording="Contrat"
          modifiers={['column']}>
          <Input
            id={`teammate_contract`}
            type="text"
            name="contract"
            value={editProfil.user.contract}
            onChangeFn={handleChange}
          />
        </FormGroup>
        <FormGroup
          labelId={`teammate_hours`}
          wording="Nombre d'heures"
          modifiers={['column']}>
          <Input
            id={`teammate_hours`}
            type="text"
            name="hours"
            value={editProfil.user.hours}
            onChangeFn={handleChange}
          />
        </FormGroup>
      </Card>
      <div className="teammate__buttons">
        <Button type="button" clicked={onCancelFn}>
          Annuler
        </Button>
        <Button modifiers={['primary']} type="submit">
          Enregistrer le profil
        </Button>
      </div>
    </Card>
  );
};

export default EditProfil;
