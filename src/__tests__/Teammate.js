import React from 'react';
import { render, screen, wait } from '@testing-library/react';

import clientWrapper from '../utilities/fetchWrapper';
import Teammate from '../components/pages/Team/Teammate/Teammate';
import { RenderWithAuthContextAndRouter } from '../tests/utilities';

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
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '5f81b5d725c0b11108fdac9e',
    memberId: '5f81b5d725c0b11108fdac9f',
  }),
}));
jest.mock('../utilities/fetchWrapper');

test('Teammate: load a team member profil', async () => {
  clientWrapper.mockResolvedValueOnce({
    teammate: [
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
    teamName: 'Team 1',
    location: {
      city: 'Aubergenville',
      geoId: '',
      address: '',
    },
    message: 'Teammate fetched.',
  });

  render(
    <RenderWithAuthContextAndRouter
      isAuthenticated={true}
      state={{
        userId: '5f3d8d23b2c12c0eacf4452e',
        token: 'HQklfPaJiOsD34K2mkxvwmEvktEYChCGHXz02oaCe',
      }}>
      <Teammate />
    </RenderWithAuthContextAndRouter>
  );

  await wait(() =>
    expect(clientWrapper).toHaveBeenCalledWith(
      'teams/teammate/5f81b5d725c0b11108fdac9e/5f81b5d725c0b11108fdac9f'
    )
  );
  await wait(() => expect(clientWrapper).toHaveBeenCalledTimes(1));

  expect(screen.getAllByText(/Lisa Simpson/i)).toBeDefined();
  expect(screen.getByText(/Responsable/i)).toBeDefined();
  expect(screen.getByText(/lisa.simpson@gmail.com/i)).toBeDefined();
  expect(screen.getByText(/CDI/i)).toBeDefined();
  expect(screen.getByText(/35/i)).toBeDefined();
  expect(screen.getAllByText(/Team 1/i)).toBeDefined();
});
