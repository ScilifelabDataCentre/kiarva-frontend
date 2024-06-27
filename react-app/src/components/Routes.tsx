import { ReactElement } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import PrivacyPage from '../pages/PrivacyPage';
import ChangeLogPage from '../pages/ChangeLogPage';

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
                path: 'changelog',
                element: <ChangeLogPage />,
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

