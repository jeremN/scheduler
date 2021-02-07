import React from 'react';
import { render } from '../../../tests/utilities';
import user from '@testing-library/user-event';
import Signup from '../Signup/Signup';

import { buildSignupDatas } from '../../../tests/generate';

test('Signup: can fill out the sign up form', async () => {
  const signupData = buildSignupDatas();
  const props = { history: [], user: null };
  const { findByLabelText } = await render(<Signup {...props} />);

  user.type(await findByLabelText(/Prénom/), signupData.firstname);
  user.type(await findByLabelText(/Nom/), signupData.lastname);
  user.type(await findByLabelText(/Email/i), signupData.email);
  user.type(await findByLabelText(/Mot de passe/i), signupData.password);

  expect(await findByLabelText(/Prénom/)).toHaveValue(signupData.firstname);
  expect(await findByLabelText(/Nom/)).toHaveValue(signupData.lastname);
  expect(await findByLabelText(/Email/i)).toHaveValue(signupData.email);
  expect(await findByLabelText(/Mot de passe/i)).toHaveValue(
    signupData.password
  );
});
