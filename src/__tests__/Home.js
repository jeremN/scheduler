import React from 'react';
import { render, screen, wait } from '@testing-library/react';

import clientWrapper from '../utilities/fetchWrapper';
import Home from '../components/pages/Home/Home';
import { RenderWithAuthContextAndRouter } from '../tests/utilities';

jest.mock('../utilities/fetchWrapper');

test('Home, should get user datas and update DOM accordingly', async () => {
  const wordingDefault = {
    noPlanningDefault: "Vous n'avez pas créer de planning",
    noTeamDefault: "Vous n'avez pas créer d'équipe",
  };

  clientWrapper.mockResolvedValueOnce({
    user: {
      email: 'johndoe@gmail.com',
      firstname: 'John',
      lastname: 'Doe',
      plannings: [
        {
          _id: 'fakeId_3',
          title: 'Planning 1',
        },
        {
          _id: 'fakeId_4',
          title: 'Planning 2',
        },
        {
          _id: 'fakeId_5',
          title: 'Planning 3',
        },
      ],
      team: [
        {
          _id: 'fakeId_1',
          name: 'Team 1',
        },
        {
          _id: 'fakeId_2',
          name: 'Team 2',
        },
      ],
    },
  });

  await render(
    <RenderWithAuthContextAndRouter
      isAuthenticated={true}
      state={{
        userId: '5f3d8d23b2c12c0eacf4452e',
        token: 'HQklfPaJiOsD34K2mkxvwmEvktEYChCGHXz02oaCe',
      }}>
      <Home />
    </RenderWithAuthContextAndRouter>
  );

  expect(
    screen.getByText(wordingDefault.noPlanningDefault)
  ).toBeInTheDocument();
  expect(screen.getByText(wordingDefault.noTeamDefault)).toBeInTheDocument();

  expect(clientWrapper).toHaveBeenCalledWith('user/5f3d8d23b2c12c0eacf4452e');
  expect(clientWrapper).toHaveBeenCalledTimes(1);

  await wait(() => expect(screen.getAllByText(/Team /i)).toHaveLength(2));
  await wait(() => expect(screen.getAllByText(/Planning /i)).toHaveLength(3));
});
