import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "pokemon/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
