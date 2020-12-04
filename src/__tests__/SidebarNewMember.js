import React from 'react';
import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';

import clientWrapper from '../utilities/fetchWrapper';
import SidebarNewMember from '../components/organisms/TeamsSidebar/SidebarNewMember';
import { RenderWithAuthContextAndRouter } from '../tests/utilities';

jest.mock('../utilities/fetchWrapper');

const fakeTeamsList = [
  {
    _id: '5f81b5d725c0b11108fdac9e',
    createdAt: '2020-10-10T13:23:35.952Z',
    updatedAt: '2020-10-27T20:27:52.534Z',
    creator: '5f3d8d23b2c12c0eacf4462e',
    name: 'Team 1',
    location: {
      city: 'Aubergenville',
      address: '',
      geoId: '',
    },
    members: [
      {
        _id: '5f98813a5ef4f335c80ff919',
        firstname: 'Maud',
        lastname: 'Flanders',
        poste: 'Responsable',
        hours: '35',
        email: 'maud.flanders@gmail.com',
        contract: 'CDI',
        notes: [],
      },
      {
        _id: '5f9881c2e15748379ccfbfcd',
        firstname: 'Ned',
        lastname: 'Flanders',
        poste: 'Vendeur',
        hours: '25',
        email: 'ned.flanders@gmail.com',
        contract: 'CDD',
        notes: [],
      },
    ],
  },
];

const selectedTeam = '5f81b5d725c0b11108fdac9e';
const newMember = {
  firstname: 'Lisa',
  lastname: 'Simpson',
  poste: 'Responsable',
  hours: '35',
  email: 'lisa.simpson@gmail.com',
  contract: 'CDI',
};

const returnedTeam = {
  ...fakeTeamsList[0],
  members: [
    ...fakeTeamsList[0].members,
    {
      ...newMember,
      _id: '5f81b5d725c0b11108fdac9f',
      notes: [],
    },
  ],
};

const teamsOptions = [
  {
    value: '5f81b5d725c0b11108fdac9e',
    wording: 'Team 1',
  },
];

test('Team: should add a new teammate', async () => {
  clientWrapper.mockResolvedValueOnce({
    team: returnedTeam,
  });

  await render(
    <RenderWithAuthContextAndRouter
      isAuthenticated={true}
      state={{
        userId: '5f3d8d23b2c12c0eacf4452e',
        token: 'HQklfPaJiOsD34K2mkxvwmEvktEYChCGHXz02oaCe',
      }}>
      <SidebarNewMember teamsOptions={teamsOptions} teams={fakeTeamsList} />
    </RenderWithAuthContextAndRouter>
  );

  user.selectOptions(await screen.findByLabelText(/Team/i), selectedTeam);

  user.type(await screen.findByLabelText(/Firstname/i), newMember.firstname);
  user.type(await screen.findByLabelText(/Lastname/i), newMember.lastname);
  user.type(await screen.findByLabelText(/Email/i), newMember.email);
  user.type(await screen.findByLabelText(/Contrat/i), newMember.contract);
  user.type(await screen.findByLabelText(/Nombres d'heures/i), newMember.hours);
  user.type(await screen.findByLabelText(/Poste/i), newMember.poste);

  await act(async () =>
    user.click(await screen.findByText(/Envoyer/i, { selector: 'button' }))
  );

  expect(clientWrapper).toHaveBeenCalledWith(
    `teams/updateTeam/${selectedTeam}`,
    {
      body: {
        updatedTeam: {
          ...fakeTeamsList[0],
          members: [
            ...fakeTeamsList[0].members,
            {
              ...newMember,
            },
          ],
        },
      },
      method: 'PUT',
    }
  );
  expect(clientWrapper).toHaveBeenCalledTimes(1);
});
