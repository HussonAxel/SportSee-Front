import { StrictMode } from 'react'
import * as ReactDOM from "react-dom/client";
import {RouterProvider } from "react-router-dom";
import router from "./router/root";
import "./main.css";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);