import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthContextProvider } from '../App';

export const RenderWithAuthContext = ({ children, authProps }) => (
  <AuthContextProvider {...authProps}>{children}</AuthContextProvider>
);

export const RenderWithRouter = ({ children }) => <Router>{children}</Router>;

export const RenderWithAuthContextAndRouter = ({ children, ...authProps }) => (
  <AuthContextProvider {...authProps}>
    <Router>{children}</Router>
  </AuthContextProvider>
);
