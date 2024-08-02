import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "../pages/Login";
import AddBook from "../pages/AddBook/AddBook";
import AddPreOrder from "../pages/AddPreOrder/AddPreOrder";
import Home from "../pages/Home/Home";

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
          path: '/',
          element: <Home />
        },
        {
          path: '/add-book',
          element: <AddBook />
        },
        {
          path: '/add-preorder',
          element: <AddPreOrder />
        },
      ]
    }
]);

export default Router