import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthContextProvider } from '../App';

export const RenderWithAuthContext = ({ children }) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

export const RenderWithRouter = ({ children }) => <Router>{children}</Router>;

export const RenderWithAuthContextAndRouter = ({ children }) => (
  <AuthContextProvider>
    <Router>{children}</Router>
  </AuthContextProvider>
);
