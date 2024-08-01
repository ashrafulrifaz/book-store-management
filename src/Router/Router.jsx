import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "../pages/Login";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Layout />,
    }
]);

export default Router