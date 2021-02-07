import {
  render as rtlRender,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProviders } from '../context';
import { buildUser } from './generate';

async function customRender(component, { user, route = '/', ...options } = {}) {
  user = typeof user === 'undefined' ? await autoLoginUser() : user;

  const returnValue = {
    ...rtlRender(component, {
      wrapper: AppProviders,
      ...options,
    }),
    user,
    history,
  };

  await waitForElementToBeRemoved(() => [...screen.queryAllByText(/loading/i)]);

  return returnValue;
}

async function autoLoginUser(userProps = {}) {
  const remainingMs = 120 * 60 * 1000;
  const expireDate = new Date(new Date().getTime() + remainingMs);
  const user = buildUser();

  window.localStorage.setItem(
    '__scheduler_stored_user__',
    JSON.stringify({
      ...user,
      expireDate: expireDate,
      ...userProps,
    })
  );

  return user;
}

const getNodeByText = (textToFind) =>
  screen.getByText((content, node) => {
    const hasText = (node) => node.textContent === textToFind;
    const nodeHastText = hasText(node);
    const childDontHaveText = [...node.children].every(
      (child) => !hasText(child)
    );

    return nodeHastText && childDontHaveText;
  });

export * from '@testing-library/react';
export { autoLoginUser, customRender as render, userEvent, getNodeByText };
