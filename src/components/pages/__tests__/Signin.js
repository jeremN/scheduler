import React from 'react';
import { render } from '../../../tests/utilities';
import user from '@testing-library/user-event';

import Signin from '../Signin/Signin';

import { buildSigninDatas } from '../../../tests/generate';

test('Signin: can fill out the sign in form', async () => {
  const signinDatas = buildSigninDatas();
  const props = { history: [], user: null };
  const { getByLabelText } = await render(<Signin {...props} />);

  user.type(getByLabelText(/Email/i), signinDatas.email);
  user.type(getByLabelText(/Mot de passe/i), signinDatas.password);

  expect(getByLabelText(/Email/i)).toHaveValue(signinDatas.email);
  expect(getByLabelText(/Mot de passe/i)).toHaveValue(signinDatas.password);
});
