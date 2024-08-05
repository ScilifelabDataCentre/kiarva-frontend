import { ReactElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import PrivacyPage from "../pages/PrivacyPage";
import ChangeLogPage from "../pages/ChangeLogPage";
import PublicationsPage from "../pages/PublicationsPage";
import MethodologyPage from "../pages/MethodologyPage";
import DownloadPage from "../pages/DownloadPage";
import PlotPage from "../pages/PlotPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "download",
        element: <DownloadPage />,
      },
      {
        path: "plot",
        element: <PlotPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "changelog",
        element: <ChangeLogPage />,
      },
      {
        path: "publications",
        element: <PublicationsPage />,
      },
      {
        path: "methodology",
        element: <MethodologyPage />,
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
    ],
  },
]);

export default function Routes(): ReactElement {
  return <RouterProvider router={router} />;
}
