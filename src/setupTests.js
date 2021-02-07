// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';

import { server } from './tests/mocks/server';
import * as auth from './context/authUtils';
import * as teamsDB from './tests/db/teams';

jest.setTimeout(20000);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

afterEach(async () => {
  await Promise.all([auth.clearStoredUser(), teamsDB.reset()]);
});
