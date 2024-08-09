import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "../pages/Login";
import AddBook from "../pages/AddBook/AddBook";
import AddPreOrder from "../pages/AddPreOrder/AddPreOrder";
import Home from "../pages/Home/Home";
import PreOrders from "../pages/PreOrders/PreOrders";
import Customers from "../pages/Customers/Customers";
import CustomerDetails from "../pages/CustomerDetails/CustomerDetails";
import PrivateRoute from "./PrivateRoute";
import EditBook from "../pages/EditBook/EditBook";

const Router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <PrivateRoute><Layout /></PrivateRoute>,
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
          path: '/edit-book/:id',
          element: <EditBook />
        },
        {
          path: '/add-preorder',
          element: <AddPreOrder />
        },
        {
          path: '/pre-orders',
          element: <PreOrders />
        },
        {
          path: '/customers',
          element: <Customers />
        },
        {
          path: '/customers/:customerName',
          element: <CustomerDetails />
        },
      ]
    }
]);

export default Router