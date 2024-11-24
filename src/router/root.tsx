import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ErrorPage from "../pages/404/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },

]);

export default router;
