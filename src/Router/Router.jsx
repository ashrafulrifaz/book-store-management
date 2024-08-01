import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "../pages/Login";
import AddBook from "../pages/AddBook/AddBook";

const Router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/add-book',
          element: <AddBook />
        }
      ]
    }
]);

export default Router