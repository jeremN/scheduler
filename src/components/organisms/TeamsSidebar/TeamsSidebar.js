import React, { Fragment } from 'react';

import {
  Sidebar,
  SidebarHeading,
  SidebarContent,
} from '../../atoms/Sidebar/Sidebar';
import Label from '../../atoms/Label/Label';
import Input from '../../atoms/Input/Input';
import SelectInput from '../../atoms/SelectInput/SelectInput';
import Fieldset from '../../molecules/Fieldset/Fieldset';
import Button from '../../atoms/Buttons/Buttons';
import FormGroup from '../../molecules/FormGroup/FormGroup';

import './TeamsSidebar.scss';

export function SidebarFilters({ teamsNames = [], postes = [] }) {
  return (
    <Sidebar modifiers={['isVisible']}>
      <SidebarHeading>Filtrer</SidebarHeading>
      <SidebarContent>
        <Fieldset legendHeading={'Equipe'}>
          {teamsNames.map((option) => (
            <Fragment key={option}>
              <Input
                id={option}
                type={'radio'}
                name={'team'}
                value={option}
                onChangeFn={() => {}}
              />
              <Label labelId={option}>{option}</Label>
            </Fragment>
          ))}
        </Fieldset>
        <Fieldset legendHeading={'Poste'}>
          {postes.map((option) => (
            <Fragment key={option}>
              <Input
                id={option}
                type={'radio'}
                name={'poste'}
                value={option}
                onChangeFn={() => {}}
              />
              <Label labelId={option}>{option}</Label>
            </Fragment>
          ))}
        </Fieldset>
      </SidebarContent>
    </Sidebar>
  );
}

export function SidebarNewMember({
  handlesFn = { submit: () => {}, change: () => {}, addMember: () => {} },
  memberForm = [],
  teamsOptions = [],
}) {
  return (
    <Sidebar modifiers={['isVisible']}>
      <SidebarHeading>Nouvel équipier</SidebarHeading>
      <SidebarContent>
        <form
          id="newMember"
          className="form__teamMember"
          onSubmit={handlesFn.submit}>
          {memberForm.map(
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
                    onChangeFn={handlesFn.change}
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
                    onChangeFn={handlesFn.change}
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
                    onChangeFn={handlesFn.change}
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
                    onChangeFn={handlesFn.change}
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
                    onChangeFn={handlesFn.change}
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
                    onChangeFn={handlesFn.change}
                  />
                </FormGroup>
                <FormGroup
                  labelId={`memberTeam_${index}`}
                  wording="Team"
                  isRequired={true}
                  modifiers={['column']}>
                  <SelectInput
                    id={`memberTeam_${index}`}
                    name={'team'}
                    optionsArray={teamsOptions}
                    onChangeFn={handlesFn.change}
                  />
                </FormGroup>
              </div>
            )
          )}
          <Button type="button" clicked={handlesFn.addMember}>
            Ajouter un équipier
          </Button>
          <Button modifiers={['primary']} type="submit">
            {memberForm.length > 1
              ? 'Ajouter des équipiers'
              : 'Créer un équipier'}
          </Button>
        </form>
      </SidebarContent>
    </Sidebar>
  );
}

export function SidebarNewTeam({
  handlesFn = { submit: () => {}, change: () => {}, addMember: () => {} },
  teamForm = {},
}) {
  return (
    <Sidebar modifiers={['isVisible']}>
      <SidebarHeading>Nouvelle équipe</SidebarHeading>
      <SidebarContent>
        <form
          id="newTeam"
          className="form__newTeam"
          onSubmit={handlesFn.submit}>
          <FormGroup
            labelId={'teamName'}
            wording="team name"
            isRequired={true}
            modifiers={['column']}>
            <Input
              id={'teamName'}
              type="text"
              name="name"
              value={teamForm.name}
              onChangeFn={handlesFn.change}
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
              value={teamForm.location.city}
              onChangeFn={handlesFn.change}
            />
          </FormGroup>
          <FormGroup
            labelId={'adress'}
            wording="address"
            isRequired={false}
            modifiers={['column']}>
            <Input
              id={'adress'}
              type="text"
              name="adress"
              value={teamForm.location.adress}
              onChangeFn={handlesFn.change}
            />
          </FormGroup>
          <SidebarHeading>Membre(s) de l'équipe</SidebarHeading>
          {teamForm.members.map(
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
                    onChangeFn={handlesFn.change}
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
                    onChangeFn={handlesFn.change}
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
                    onChangeFn={handlesFn.change}
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
                    onChangeFn={handlesFn.change}
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
                    onChangeFn={handlesFn.change}
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
                    onChangeFn={handlesFn.change}
                  />
                </FormGroup>
              </div>
            )
          )}
          <Button type="button" clicked={handlesFn.addMember}>
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
