import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthWithRouterProvider } from './authContext';

function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <AuthWithRouterProvider>{children}</AuthWithRouterProvider>
    </BrowserRouter>
  );
}

export { AppProviders };
