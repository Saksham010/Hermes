import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },{
    path:'/dashboard',
    element:<Dashboard/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);