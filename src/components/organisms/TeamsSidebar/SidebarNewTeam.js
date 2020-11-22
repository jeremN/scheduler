import React, { useState } from 'react';

import {
  Sidebar,
  SidebarHeading,
  SidebarContent,
} from '../../atoms/Sidebar/Sidebar';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Buttons/Buttons';
import FormGroup from '../../molecules/FormGroup/FormGroup';

import clientWrapper from '../../../utilities/fetchWrapper';

import './TeamsSidebar.scss';

const defaultState = {
  name: '',
  location: {
    city: '',
    address: '',
  },
  members: [
    {
      firstname: '',
      lastname: '',
      contract: '',
      hours: '',
      poste: '',
      email: '',
    },
  ],
};

export default function SidebarNewTeam({
  onSubmitFns = { success: () => {}, failed: () => {}, clear: () => {} },
}) {
  const [formState, setFormState] = useState(defaultState);

  const handleNewTeamChange = (evt, field = null, val = null) => {
    const updatedTeamForm = { ...formState };
    const isLocation = ['city', 'address'];
    const isMember = [
      'firstname',
      'lastname',
      'contract',
      'hours',
      'poste',
      'email',
    ];

    const fieldName = field ? field : evt.target.name;
    const fieldValue = val ? val : evt.target.value;

    if (isLocation.includes(fieldName)) {
      updatedTeamForm.location = { ...formState.location };
      updatedTeamForm.location[fieldName] = fieldValue;
    } else if (isMember.includes(fieldName)) {
      const memberIndex = evt.target.closest('.teamMember').dataset.memberIndex;
      updatedTeamForm.members = [...formState.members];
      updatedTeamForm.members[memberIndex][fieldName] = fieldValue;
    } else {
      updatedTeamForm[fieldName] = fieldValue;
    }

    setFormState(updatedTeamForm);
  };

  const handleNewTeamSubmit = (e) => {
    e.preventDefault();

    clientWrapper(`teams/newTeam`, {
      body: { newTeam: { ...formState } },
    })
      .then(async (result) => {
        const datas = await result;

        if (datas.newTeamID) {
          // eslint-disable-next-line no-unused-expressions
          onSubmitFns?.success(datas.teamsList);
        } else {
          // eslint-disable-next-line no-unused-expressions
          onSubmitFns?.failed();
          throw new Error(
            'An error occured while trying to create your team, please try again'
          );
        }
      })
      .finally(() => {
        setFormState(defaultState);
        // eslint-disable-next-line no-unused-expressions
        onSubmitFns?.clear();
      });
  };

  function handleAddNewTeamMember() {
    const updatedForm = {
      ...formState,
      members: [
        ...formState.members,
        {
          firstname: '',
          lastname: '',
          contract: '',
          hours: '',
          poste: '',
          email: '',
        },
      ],
    };
    setFormState(updatedForm);
  }

  return (
    <Sidebar modifiers={['isVisible']}>
      <SidebarHeading>Nouvelle équipe</SidebarHeading>
      <SidebarContent>
        <form
          id="newTeam"
          className="form__newTeam"
          onSubmit={handleNewTeamSubmit}>
          <FormGroup
            labelId={'teamName'}
            wording="team name"
            isRequired={true}
            modifiers={['column']}>
            <Input
              id={'teamName'}
              type="text"
              name="name"
              value={formState.name}
              onChangeFn={handleNewTeamChange}
            />
          </FormGroup>
          <FormGroup
            labelId={'city'}
            wording="city"
            isRequired={false}
            modifiers={['column']}>
            <Input
              id={'city'}
              type="text"
              name="city"
              value={formState.location.city}
              onChangeFn={handleNewTeamChange}
            />
          </FormGroup>
          <FormGroup
            labelId={'address'}
            wording="address"
            isRequired={false}
            modifiers={['column']}>
            <Input
              id={'address'}
              type="text"
              name="address"
              value={formState.location.address}
              onChangeFn={handleNewTeamChange}
            />
          </FormGroup>
          <SidebarHeading>Membre(s) de l'équipe</SidebarHeading>
          {formState.members.map(
            ({ firstname, lastname, email, poste, contract, hours }, index) => (
              <div
                key={`newMember_${index}`}
                className="teamMember"
                data-member-index={index}>
                <FormGroup
                  labelId={`memberFirstname_${index}`}
                  wording="Firstname"
                  isRequired={true}
                  modifiers={['column']}>
                  <Input
                    id={`memberFirstname_${index}`}
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChangeFn={handleNewTeamChange}
                  />
                </FormGroup>
                <FormGroup
                  labelId={`memberLastname_${index}`}
                  wording="Lastname"
                  isRequired={true}
                  modifiers={['column']}>
                  <Input
                    id={`memberLastname_${index}`}
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChangeFn={handleNewTeamChange}
                  />
                </FormGroup>
                <FormGroup
                  labelId={`memberEmail_${index}`}
                  wording="Email"
                  isRequired={false}
                  modifiers={['column']}>
                  <Input
                    id={`memberEmail_${index}`}
                    type="email"
                    name="email"
                    value={email}
                    onChangeFn={handleNewTeamChange}
                  />
                </FormGroup>
                <FormGroup
                  labelId={`memberContract_${index}`}
                  wording="Contrat"
                  isRequired={false}
                  modifiers={['column']}>
                  <Input
                    id={`memberContract_${index}`}
                    type="text"
                    name="contract"
                    value={contract}
                    onChangeFn={handleNewTeamChange}
                  />
                </FormGroup>
                <FormGroup
                  labelId={`memberHours_${index}`}
                  wording="Nombres d'heures"
                  isRequired={false}
                  modifiers={['column']}>
                  <Input
                    id={`memberHours_${index}`}
                    type="text"
                    name="hours"
                    value={hours}
                    onChangeFn={handleNewTeamChange}
                  />
                </FormGroup>
                <FormGroup
                  labelId={`memberPoste_${index}`}
                  wording="Poste"
                  isRequired={false}
                  modifiers={['column']}>
                  <Input
                    id={`memberPoste_${index}`}
                    type="text"
                    name="poste"
                    value={poste}
                    onChangeFn={handleNewTeamChange}
                  />
                </FormGroup>
              </div>
            )
          )}
          <Button type="button" clicked={handleAddNewTeamMember}>
            Ajouter un équipier
          </Button>
          <Button modifiers={['primary']} type="submit">
            Créer l'équipe
          </Button>
        </form>
      </SidebarContent>
    </Sidebar>
  );
}
