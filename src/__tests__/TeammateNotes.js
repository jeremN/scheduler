import React from 'react';
import { render, screen, wait, cleanup } from '@testing-library/react';
import user from '@testing-library/user-event';

import clientWrapper from '../utilities/fetchWrapper';
import TeammateNotes from '../components/organisms/TeammateNotes/TeammateNotes';
import { RenderWithAuthContextAndRouter } from '../tests/utilities';

const teammateNotes = [
  {
    _id: '5fc6ad43b69b544564073cd0',
    content: 'Hello there !',
  },
  {
    _id: '5fc6ad43b69b544564073cd1',
    content: 'General Kenobi !',
  },
];
const expectedOnNewNotes = [
  ...teammateNotes,
  {
    content: 'This is a new note !',
  },
];
const expectedOnDeleteNote = [
  {
    ...teammateNotes[1],
  },
];

const route =
  'teams/updateTeammate/5f81b5d725c0b11108fdac9e/5f81b5d725c0b11108fdac9f';

jest.mock('../utilities/fetchWrapper');

test('Teammate: should update teammate notes', async () => {
  clientWrapper.mockResolvedValueOnce({
    message: 'Teammate profil updated !',
    updated: true,
  });

  render(
    <RenderWithAuthContextAndRouter
      isAuthenticated={true}
      state={{
        userId: '5f3d8d23b2c12c0eacf4452e',
        token: 'HQklfPaJiOsD34K2mkxvwmEvktEYChCGHXz02oaCe',
      }}>
      <TeammateNotes
        route={route}
        notes={teammateNotes}
        onSubmitFn={{
          success: (notesUpdated) => {
            expect(notesUpdated).toEqual(expectedOnNewNotes);
          },
          clear: () => {},
        }}
      />
    </RenderWithAuthContextAndRouter>
  );
  expect(await screen.findByText(/Hello there !/i)).toBeDefined();
  expect(await screen.findByText(/General Kenobi !/i)).toBeDefined();

  user.type(
    await screen.findByLabelText('Nouvelle note'),
    'This is a new note !'
  );
  user.click(
    await screen.findByText(/Enregistrer la note/i, { selector: 'button' })
  );

  await wait(() =>
    expect(clientWrapper).toHaveBeenCalledWith(route, {
      body: {
        updatedTeammate: { notes: expectedOnNewNotes },
      },
      method: 'PUT',
    })
  );
  await wait(() => expect(clientWrapper).toHaveBeenCalledTimes(1));
});

test('Teammate: should delete note', async () => {
  clientWrapper.mockResolvedValueOnce({
    message: 'Teammate profil updated !',
    updated: true,
  });

  render(
    <RenderWithAuthContextAndRouter
      isAuthenticated={true}
      state={{
        userId: '5f3d8d23b2c12c0eacf4452e',
        token: 'HQklfPaJiOsD34K2mkxvwmEvktEYChCGHXz02oaCe',
      }}>
      <TeammateNotes
        route={route}
        notes={teammateNotes}
        onSubmitFn={{
          success: (notesUpdated) => {
            expect(notesUpdated).toEqual(expectedOnDeleteNote);
          },
          clear: () => {},
        }}
      />
    </RenderWithAuthContextAndRouter>
  );

  expect(await screen.findByText(/Hello there !/i)).toBeDefined();
  expect(await screen.findByText(/General Kenobi !/i)).toBeDefined();

  const deleteBtns = await screen.getAllByText(/Effacer/i);
  user.click(deleteBtns[0]);

  await wait(() =>
    expect(clientWrapper).toHaveBeenCalledWith(route, {
      body: {
        updatedTeammate: { notes: expectedOnDeleteNote },
      },
      method: 'PUT',
    })
  );
  await wait(() => expect(clientWrapper).toHaveBeenCalledTimes(2));
});
