import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
  autoLoginUser,
} from '../../../tests/utilities';
import Home from '../Home/Home';

test('Home, should get user datas and update DOM accordingly', async () => {
  const user = await autoLoginUser();
  const props = { history: [], user };
  const { getAllByText } = await render(<Home {...props} />);

  expect(getAllByText('Chargement...')).toHaveLength(2);

  await waitForElementToBeRemoved(
    () => [...screen.queryAllByText(/Chargement.../i)],
    { timeout: 4000 }
  );

  expect(getAllByText(/Team /i)).toHaveLength(2);
  expect(getAllByText(/Planning /i)).toHaveLength(3);
});
