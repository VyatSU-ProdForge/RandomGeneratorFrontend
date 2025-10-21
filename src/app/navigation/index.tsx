import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './config';

const router = createBrowserRouter(routes);

export function AppRouter(): React.ReactElement {
  return <RouterProvider router={router} />;
}

