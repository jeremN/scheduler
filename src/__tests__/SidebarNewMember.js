import React from 'react';
import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';

import clientWrapper from '../utilities/fetchWrapper';
import SidebarNewMember from '../components/organisms/TeamsSidebar/SidebarNewMember';
import { RenderWithAuthContextAndRouter } from '../tests/utilities';

jest.mock('../utilities/fetchWrapper');

const testDatas = {
  selectedTeam: '5f81b5d725c0b11108fdac9e',
  members: [
    {
      firstname: 'Lisa',
      lastname: 'Simpson',
      poste: 'Responsable',
      hours: '35',
      email: 'lisa.simpson@gmail.com',
      contract: 'CDI',
    },
  ],
};

const returnedTeam = {
  _id: '5f81b5d725c0b11108fdac9e',
  createdAt: '2020-10-10T13:23:35.952Z',
  updatedAt: '2020-10-27T20:27:52.534Z',
  creator: '5f3d8d23b2c12c0eacf4462e',
  name: 'Team 1',
  location: {
    city: 'Aubergenville',
    address: '',
  },
  members: [
    {
      ...testDatas.members[0],
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
      <SidebarNewMember teamsOptions={teamsOptions} />
    </RenderWithAuthContextAndRouter>
  );

  user.selectOptions(
    await screen.findByLabelText(/Team/i),
    testDatas.selectedTeam
  );

  user.type(
    await screen.findByLabelText(/Firstname/i),
    testDatas.members[0].firstname
  );
  user.type(
    await screen.findByLabelText(/Lastname/i),
    testDatas.members[0].lastname
  );
  user.type(await screen.findByLabelText(/Email/i), testDatas.members[0].email);
  user.type(
    await screen.findByLabelText(/Contrat/i),
    testDatas.members[0].contract
  );
  user.type(
    await screen.findByLabelText(/Nombres d'heures/i),
    testDatas.members[0].hours
  );
  user.type(await screen.findByLabelText(/Poste/i), testDatas.members[0].poste);

  await act(async () =>
    user.click(await screen.findByText(/Envoyer/i, { selector: 'button' }))
  );
  expect(clientWrapper).toHaveBeenCalledWith(
    `teams/updateTeam/${testDatas.selectedTeam}`,
    {
      body: { updatedTeam: [...testDatas.members] },
    }
  );
  expect(clientWrapper).toHaveBeenCalledTimes(1);
});
