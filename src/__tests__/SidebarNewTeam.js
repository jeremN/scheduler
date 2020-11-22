import React from 'react';
import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';

import clientWrapper from '../utilities/fetchWrapper';
import SidebarNewTeam from '../components/organisms/TeamsSidebar/SidebarNewTeam';
import { RenderWithAuthContextAndRouter } from '../tests/utilities';

jest.mock('../utilities/fetchWrapper');

const testMemberData = {
  firstname: 'Lisa',
  lastname: 'Simpson',
  poste: 'Responsable',
  hours: '35',
  email: 'lisa.simpson@gmail.com',
  contract: 'CDI',
};

const testTeamData = {
  name: 'Team 1',
  location: {
    city: 'Aubergenville',
    address: '9 fake rue ici',
  },
  members: [{ ...testMemberData }],
};

const testDatas = [
  {
    name: testTeamData.name,
    _id: '5f81b5d725c0b11108fdac9e',
    createdAt: '2020-10-10T13:23:35.952Z',
    updatedAt: '2020-10-27T20:27:52.534Z',
    creator: '5f3d8d23b2c12c0eacf4462e',
    location: {
      ...testTeamData.location,
    },
    members: [
      {
        ...testMemberData,
        _id: '5f81b5d725c0b11108fdac9f',
        notes: [],
      },
    ],
  },
];

test('Team: should create a new team', async () => {
  clientWrapper.mockResolvedValueOnce({
    teamsList: testDatas,
    newTeamID: '5f81b5d725c0b11108fdac9e',
  });

  await render(
    <RenderWithAuthContextAndRouter
      isAuthenticated={true}
      state={{
        userId: '5f3d8d23b2c12c0eacf4452e',
        token: 'HQklfPaJiOsD34K2mkxvwmEvktEYChCGHXz02oaCe',
      }}>
      <SidebarNewTeam />
    </RenderWithAuthContextAndRouter>
  );

  user.type(await screen.findByLabelText(/team name/i), testTeamData.name);
  user.type(await screen.findByLabelText(/city/i), testTeamData.location.city);
  user.type(
    await screen.findByLabelText(/address/i),
    testTeamData.location.address
  );

  user.type(
    await screen.findByLabelText(/Firstname/i),
    testMemberData.firstname
  );
  user.type(await screen.findByLabelText(/Lastname/i), testMemberData.lastname);
  user.type(await screen.findByLabelText(/Email/i), testMemberData.email);
  user.type(await screen.findByLabelText(/Contrat/i), testMemberData.contract);
  user.type(
    await screen.findByLabelText(/Nombres d'heures/i),
    testMemberData.hours
  );
  user.type(await screen.findByLabelText(/Poste/i), testMemberData.poste);

  await act(async () =>
    user.click(
      await screen.findByText(/Créer l'équipe/i, { selector: 'button' })
    )
  );
  expect(clientWrapper).toHaveBeenCalledWith(`teams/newTeam`, {
    body: { newTeam: testTeamData },
  });
  expect(clientWrapper).toHaveBeenCalledTimes(1);
});
