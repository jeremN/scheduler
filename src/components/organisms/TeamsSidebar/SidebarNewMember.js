import React, { useState } from 'react';

import {
  Sidebar,
  SidebarHeading,
  SidebarContent,
} from '../../atoms/Sidebar/Sidebar';
import Loader from '../../atoms/Loader/Loader';
import Input from '../../atoms/Input/Input';
import SelectInput from '../../atoms/SelectInput/SelectInput';
import Button from '../../atoms/Buttons/Buttons';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import ErrorMessage from '../../molecules/ErrorMessage/ErrorMessage';

import { useClient } from '../../../context/authContext';
import { useAsync } from '../../../hooks/useAsync';

import './TeamsSidebar.scss';

const defaultState = {
  selectedTeam: '',
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

export default function SidebarNewMember({
  onCloseSidebar = () => {},
  onSubmitFns = {
    beforeSend: () => {},
    clear: () => {},
    success: () => {},
    failed: () => {},
  },
  teamsOptions = [],
  teams = [],
}) {
  const client = useClient();
  const { isLoading, isError, error, run } = useAsync();
  const [formState, setFormState] = useState(defaultState);

  function handleAddNewMember() {
    const updatedForm = [
      ...formState.members,
      {
        firstname: '',
        lastname: '',
        contract: '',
        hours: '',
        poste: '',
        email: '',
      },
    ];
    setFormState({
      ...formState,
      members: updatedForm,
    });
  }

  const handleSelectedTeamChange = (evt) => {
    const { target } = evt;
    setFormState({
      ...formState,
      selectedTeam: target.value,
    });
  };

  const handleNewMemberChange = (evt, field = null, val = null) => {
    const memberIndex = evt.target.closest('.teamMember').dataset.memberIndex;
    const updatedMembers = [...formState.members];
    const fieldName = field ? field : evt.target.name;
    const fieldValue = val ? val : evt.target.value;

    updatedMembers[memberIndex][fieldName] = fieldValue;
    setFormState({
      ...formState,
      members: updatedMembers,
    });
  };

  const handleNewMemberSubmit = (e) => {
    e.preventDefault();

    if (formState.selectedTeam === '') return;

    const teamToUpdate = [...teams].filter(
      (team) => team._id === formState.selectedTeam
    );

    run(
      client(`teams/updateTeam/${formState.selectedTeam}`, {
        body: {
          updatedTeam: {
            ...teamToUpdate[0],
            members: [...teamToUpdate[0].members, ...formState.members],
          },
        },
        method: 'PUT',
      })
        .then(async (result) => {
          const datas = await result;
          if (datas.team) {
            onSubmitFns?.success(datas.team);
          } else {
            onSubmitFns?.failed();
            throw new Error(
              'An error occured while trying to add team member(s), please try again'
            );
          }
        })
        .finally(() => {
          setFormState(defaultState);
          onSubmitFns?.clear();
        })
    );
  };

  return (
    <Sidebar modifiers={['isVisible']}>
      <Button
        modifiers={['rounded', 'bordered', 'even']}
        clicked={onCloseSidebar}
        type="submit">
        X
      </Button>
      <SidebarHeading>Ajouter un/des équipier(s)</SidebarHeading>
      <SidebarContent>
        <form
          id="newMember"
          className="form__teamMember"
          onSubmit={handleNewMemberSubmit}>
          <FormGroup
            labelId={`memberTeam`}
            wording="Team"
            isRequired={true}
            modifiers={['column']}>
            <SelectInput
              id={`memberTeam`}
              name={'team'}
              value={formState.selectedTeam}
              optionsArray={[
                { wording: 'choisir une équipe', value: '' },
                ...teamsOptions,
              ]}
              onChangeFn={handleSelectedTeamChange}
            />
          </FormGroup>
          {formState.members.map(
            ({ firstname, lastname, email, contract, hours, poste }, index) => (
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
                    onChangeFn={handleNewMemberChange}
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
                    onChangeFn={handleNewMemberChange}
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
                    onChangeFn={handleNewMemberChange}
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
                    onChangeFn={handleNewMemberChange}
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
                    onChangeFn={handleNewMemberChange}
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
                    onChangeFn={handleNewMemberChange}
                  />
                </FormGroup>
              </div>
            )
          )}
          <Button type="button" clicked={handleAddNewMember}>
            Ajouter un équipier
          </Button>
          <Button modifiers={['primary']} type="submit">
            Créer l'équipier
            {isLoading ? <Loader /> : null}
          </Button>
          {isError ? <ErrorMessage error={error} /> : null}
        </form>
      </SidebarContent>
    </Sidebar>
  );
}
