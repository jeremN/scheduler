import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import user from '@testing-library/user-event';

import clientWrapper from '../utilities/fetchWrapper';
import TeamMembersList from '../components/organisms/TeamMembersList/TeamMembersList';
import { RenderWithAuthContextAndRouter } from '../tests/utilities';

jest.mock('../utilities/fetchWrapper');

const testDatas = [
  {
    _id: '5f81df4125c0b11108fdaca3',
    createdAt: '2020-10-10T16:20:17.149Z',
    updatedAt: '2020-10-27T20:27:52.534Z',
    creator: '5f3d8d23b2c12c0eacf4462e',
    name: 'Team 1',
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

test('Team: Should delete a teammate', async () => {
  clientWrapper.mockResolvedValueOnce({
    deleted: true,
    message: 'Teammate deleted !',
  });

  render(
    <RenderWithAuthContextAndRouter
      isAuthenticated={true}
      state={{
        userId: '5f3d8d23b2c12c0eacf4452e',
        token: 'HQklfPaJiOsD34K2mkxvwmEvktEYChCGHXz02oaCe',
      }}>
      <TeamMembersList
        teamList={testDatas}
        activeFilters={['Team 1', 'Team 2']}
        onDeleteFns={{
          success: (datas) => {
            expect(datas[0].members).toHaveLength(1);
          },
        }}
      />
    </RenderWithAuthContextAndRouter>
  );

  expect(screen.getAllByText(/Team 1/i)).toHaveLength(2);

  const btns = await screen.getAllByText(/Effacer/i);
  user.click(btns[1]);

  expect(clientWrapper).toHaveBeenCalledWith(
    'teams/deleteTeammate/5f81df4125c0b11108fdaca3/5f9881c2e15748379ccfbfcd',
    {
      method: 'DELETE',
    }
  );
  expect(clientWrapper).toHaveBeenCalledTimes(1);
});
