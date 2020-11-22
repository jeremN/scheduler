import React from 'react';
import { render, screen, wait } from '@testing-library/react';

import clientWrapper from '../utilities/fetchWrapper';
import Team from '../components/pages/Team/Team';
import { RenderWithAuthContextAndRouter } from '../tests/utilities';

jest.mock('../utilities/fetchWrapper');

const testDatas = [
  {
    _id: '5f81b5d725c0b11108fdac9e',
    createdAt: '2020-10-10T13:23:35.952Z',
    updatedAt: '2020-10-27T20:27:52.534Z',
    creator: '5f3d8d23b2c12c0eacf4462e',
    name: 'Team 1',
    location: {
      city: 'Aubergenville',
      geoId: '',
      address: '',
    },
    members: [
      {
        _id: '5f81b5d725c0b11108fdac9f',
        firstname: 'Lisa',
        lastname: 'Simpson',
        poste: 'Responsable',
        hours: 35,
        email: 'lisa.simpson@gmail.com',
        contract: 'CDI',
        notes: [],
      },
    ],
  },
  {
    _id: '5f81df4125c0b11108fdaca3',
    createdAt: '2020-10-10T16:20:17.149Z',
    updatedAt: '2020-10-27T20:27:52.534Z',
    creator: '5f3d8d23b2c12c0eacf4462e',
    name: 'Team 2',
    location: {
      city: 'Plaisir',
      geoId: '',
      address: '',
    },
    members: [
      {
        _id: '5f98813a5ef4f335c80ff919',
        firstname: 'Maud',
        lastname: 'Flanders',
        poste: 'Responsable',
        hours: 35,
        email: 'maud.flanders@gmail.com',
        contract: 'CDI',
        notes: [],
      },
      {
        _id: '5f9881c2e15748379ccfbfcd',
        firstname: 'Ned',
        lastname: 'Flanders',
        poste: 'Vendeur',
        hours: 25,
        email: 'ned.flanders@gmail.com',
        contract: 'CDD',
        notes: [],
      },
    ],
  },
];

test('Team: should display a list of teammate', async () => {
  clientWrapper.mockResolvedValueOnce({
    teamsList: testDatas,
  });

  await render(
    <RenderWithAuthContextAndRouter
      isAuthenticated={true}
      state={{
        userId: '5f3d8d23b2c12c0eacf4452e',
        token: 'HQklfPaJiOsD34K2mkxvwmEvktEYChCGHXz02oaCe',
      }}>
      <Team />
    </RenderWithAuthContextAndRouter>
  );

  expect(clientWrapper).toHaveBeenCalledWith('teams/teamsList');
  expect(clientWrapper).toHaveBeenCalledTimes(1);

  await wait(() => expect(screen.getAllByText(/Team 2/i)).toHaveLength(3));
  await wait(() => expect(screen.getAllByText(/Team 1/i)).toHaveLength(2));
});
