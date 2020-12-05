import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import clientWrapper from '../utilities/fetchWrapper';
import EditProfil from '../components/organisms/TeammateEditForm/TeammateEditForm';
import { RenderWithAuthContextAndRouter } from '../tests/utilities';

const teammateProfil = {
  firstname: 'Lisa',
  lastname: 'Simpson',
  poste: 'Responsable',
  hours: '35',
  email: 'lisa.simpson@gmail.com',
  contract: 'CDI',
};

const updatedProfil = {
  firstname: 'Maud',
  lastname: 'Flanders',
  poste: 'Responsable adjointe',
  hours: '39',
  email: 'marge.simpson@gmail.com',
  contract: 'CDD',
};

const route =
  'teams/updateTeammate/5f81b5d725c0b11108fdac9e/5f81b5d725c0b11108fdac9f';

jest.mock('../utilities/fetchWrapper');

test('Teammate: should edit a teammate profil', async () => {
  clientWrapper.mockResolvedValueOnce({
    message: 'Teammate profil updated !',
    updated: true,
  });

  const { findByLabelText, findByText } = render(
    <RenderWithAuthContextAndRouter
      isAuthenticated={true}
      state={{
        userId: '5f3d8d23b2c12c0eacf4452e',
        token: 'HQklfPaJiOsD34K2mkxvwmEvktEYChCGHXz02oaCe',
      }}>
      <EditProfil
        route={route}
        initialState={teammateProfil}
        onSubmitFn={{
          success: (updatedUser) => {
            expect(updatedUser).toEqual(updatedProfil);
          },
          clear: () => {},
        }}
      />
    </RenderWithAuthContextAndRouter>
  );

  expect(await findByLabelText(/Email/i)).toHaveValue(teammateProfil.email);
  expect(await findByLabelText(/Firstname/i)).toHaveValue(
    teammateProfil.firstname
  );
  expect(await findByLabelText(/Lastname/i)).toHaveValue(
    teammateProfil.lastname
  );
  expect(await findByLabelText(/Poste/i)).toHaveValue(teammateProfil.poste);
  expect(await findByLabelText(/Contrat/i)).toHaveValue(
    teammateProfil.contract
  );
  expect(await findByLabelText(/Nombre d'heures/i)).toHaveValue(
    teammateProfil.hours
  );

  user.type(await findByLabelText(/Email/i), updatedProfil.email);
  user.type(await findByLabelText(/Firstname/i), updatedProfil.firstname);
  user.type(await findByLabelText(/Lastname/i), updatedProfil.lastname);
  user.type(await findByLabelText(/Poste/i), updatedProfil.poste);
  user.type(await findByLabelText(/Contrat/i), updatedProfil.contract);
  user.type(await findByLabelText(/Nombre d'heures/i), updatedProfil.hours);

  user.click(await findByText(/Enregistrer/i, { selector: 'button' }));

  expect(clientWrapper).toHaveBeenCalledWith(route, {
    body: {
      updatedTeammate: updatedProfil,
    },
    method: 'PUT',
  });
  expect(clientWrapper).toHaveBeenCalledTimes(1);
});
