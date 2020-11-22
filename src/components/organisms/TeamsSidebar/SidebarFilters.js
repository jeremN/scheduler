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

export default function SidebarFilters({ teamsNames = [], postes = [] }) {
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
