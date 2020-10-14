import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import clientWrapper from '../utilities/fetchWrapper';
import Signup from '../components/pages/Signup/Signup';
import { RenderWithAuthContextAndRouter } from '../tests/utilities';

jest.mock('../utilities/fetchWrapper');

test('Signup: can fill out the sign up form', async () => {
  clientWrapper.mockResolvedValueOnce({
    userID: '5f3d8d23b2c12c0eacf4452e',
    message: 'User created',
  });
  const testData = {
    email: 'john@doe.com',
    password: '12345678',
    firstname: 'John',
    lastname: 'Doe',
  };
  const props = { history: [] };
  const { findByText, findByLabelText } = render(
    <RenderWithAuthContextAndRouter>
      <Signup {...props} />
    </RenderWithAuthContextAndRouter>
  );

  user.type(await findByLabelText(/Prénom/), testData.firstname);
  user.type(await findByLabelText(/Nom/), testData.lastname);
  user.type(await findByLabelText(/Email/i), testData.email);
  user.type(await findByLabelText(/Mot de passe/i), testData.password);

  expect(await findByLabelText(/Prénom/)).toHaveValue(testData.firstname);
  expect(await findByLabelText(/Nom/)).toHaveValue(testData.lastname);
  expect(await findByLabelText(/Email/i)).toHaveValue(testData.email);
  expect(await findByLabelText(/Mot de passe/i)).toHaveValue(testData.password);

  user.click(await findByText(/S'inscrire/i, { selector: 'button' }));

  expect(clientWrapper).toHaveBeenCalledWith('auth/signup', { body: testData });
  expect(clientWrapper).toHaveBeenCalledTimes(1);
});
