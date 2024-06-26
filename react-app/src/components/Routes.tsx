import { ReactElement } from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import DataSourcesPage from '../pages/DataSourcesPage';
import PrivacyPage from '../pages/PrivacyPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'about',
                element: <AboutPage />,
            },
            {
                path: 'datasources',
                element: <DataSourcesPage />,
            },
            {
                path: 'privacy',
                element: <PrivacyPage />,
            },
        ]
    },
  ]);

export default function Routes(): ReactElement {
    return <RouterProvider router={router} />;
}

