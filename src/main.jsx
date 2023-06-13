import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import 'antd/dist/reset.css';
import Login from "./page/Login";
import Register from "./page/Register";
import Dashboard from "./page/Dashboard";
import RequireLogin from "./auth/RequireLogin";
import DetailHandicrafts from "./page/DetailHandicrafts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <RequireLogin><Dashboard /></RequireLogin>,
  },
  {
    path: "/dashboard/:handiId",
    element: <RequireLogin><DetailHandicrafts /></RequireLogin>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);