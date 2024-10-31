// import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SuspenseGlobal from "../Components/Suspense/Suspense";
import {
  Error,
  Home,
  Login,
  Products,
  Dashboard,
  Product_category,
  Employees,
  CreateEmployee,
  AddProductCategory,
  Customers,
  AddNewProducts,
  Vendors,
} from "../Paths";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

import SuperAdminPrivateRoute from "../PrivateRoute/SuperAdminPrivateRoute";

const router = [
  {
    path: "/",
    element: (
      <SuperAdminPrivateRoute>
        <SuspenseGlobal>
          <Vendors />
        </SuspenseGlobal>
      </SuperAdminPrivateRoute>
    ),
  },
  {
    path: "vendor",
    element: (
      <PrivateRoute>
        <SuspenseGlobal>
          <Home />
        </SuspenseGlobal>
      </PrivateRoute>
    ),
    children: [
      //Links
      {
        path: "",
        element: (
          <SuspenseGlobal>
            <Dashboard />
          </SuspenseGlobal>
        ),
      },
      {
        path: "products",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <Products />
              </SuspenseGlobal>
            ),
          },
          {
            path: "create_product",
            element: (
              <SuspenseGlobal>
                <AddNewProducts />
              </SuspenseGlobal>
            ),
          },
        ],
      },
      {
        path: "product_category",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <Product_category />
              </SuspenseGlobal>
            ),
          },
          {
            path: "create_product_category",
            element: (
              <SuspenseGlobal>
                <AddProductCategory />
              </SuspenseGlobal>
            ),
          },
        ],
      },
      {
        path: "employees",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <Employees />
              </SuspenseGlobal>
            ),
          },
          {
            path: "createEmployee",
            element: (
              <SuspenseGlobal>
                <CreateEmployee />
              </SuspenseGlobal>
            ),
          },
        ],
      },
      {
        path: "customers",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <Customers />
              </SuspenseGlobal>
            ),
          },
        ],
      },
    ],
  },

  //authentication
  {
    path: "login",
    element: (
      <SuspenseGlobal>
        <Login />
      </SuspenseGlobal>
    ),
  },
  {
    path: "register",
    element: (
      <SuspenseGlobal>
        <></>
      </SuspenseGlobal>
    ),
  },
  // 404
  {
    path: "*",
    element: (
      <SuspenseGlobal>
        <Error />
      </SuspenseGlobal>
    ),
  },
];

const appRouter = createBrowserRouter(router);

export default appRouter;
