import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import clientWrapper from '../utilities/fetchWrapper';
import Signin from '../components/pages/Signin/Signin';
import { RenderWithAuthContextAndRouter } from '../tests/utilities';

jest.mock('../utilities/fetchWrapper');

test('Signin: can fill out the sign in form', async () => {
  clientWrapper.mockResolvedValueOnce({
    userID: '5f3d8d23b2c12c0eacf4452e',
    token: 'HQklfPaJiOsD34K2mkxvwmEvktEYChCGHXz02oaCe',
  });
  const testData = { email: 'test@test.fr', password: '12345678' };
  const props = { history: [] };
  const { findByText, findByLabelText } = render(
    <RenderWithAuthContextAndRouter>
      <Signin {...props} />
    </RenderWithAuthContextAndRouter>
  );

  user.type(await findByLabelText(/Email/i), testData.email);
  user.type(await findByLabelText(/Mot de passe/i), testData.password);

  expect(await findByLabelText(/Email/i)).toHaveValue(testData.email);
  expect(await findByLabelText(/Mot de passe/i)).toHaveValue(testData.password);

  user.click(await findByText(/Se connecter/i, { selector: 'button' }));

  expect(clientWrapper).toHaveBeenCalledWith('auth/login', { body: testData });
  expect(clientWrapper).toHaveBeenCalledTimes(1);
});
