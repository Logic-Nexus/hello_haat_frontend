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
  EditEmployee,
  Zone,
  CreateZone,
  Suppliers,
  CreateSupplier,
  PurchaseProduct,
  StockReport,
  Coupon,
  DeliveryCharge,
  CreateProductPurchase,
  AllOrders,
  Income,
  Expenses
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
        path: "all_orders",
        element: (
          <SuspenseGlobal>
            <AllOrders />
          </SuspenseGlobal>
        ),
      },
      //Products
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

      //Product Category
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

      //Purchase Product
      {
        path: "purchase",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <PurchaseProduct />
              </SuspenseGlobal>
            ),
          },
          {
            path: "purchase_product",
            element: (
              <SuspenseGlobal>
                <CreateProductPurchase />
              </SuspenseGlobal>
            ),
          },
        ],
      },

      //zone
      {
        path: "zone",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <Zone />
              </SuspenseGlobal>
            ),
          },
          {
            path: "create_zone",
            element: (
              <SuspenseGlobal>
                <CreateZone />
              </SuspenseGlobal>
            ),
          },
        ],
      },
      //employee
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
          {
            path: "editEmployee",
            element: (
              <SuspenseGlobal>
                <EditEmployee />
              </SuspenseGlobal>
            ),
          },
        ],
      },
      // customers
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
      // suppliers
      {
        path: "suppliers",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <Suppliers />
              </SuspenseGlobal>
            ),
          },
          {
            path: "createSupplier",
            element: (
              <SuspenseGlobal>
                <CreateSupplier />
              </SuspenseGlobal>
            ),
          },
        ],
      },
      //Reports
      {
        path: "stock_report",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <StockReport />
              </SuspenseGlobal>
            ),
          },
        ],
      },
      //Coupon
      {
        path: "coupon",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <Coupon />
              </SuspenseGlobal>
            ),
          },
        ],
      },
      // delivery charge
      {
        path: "delivery_charge_settings",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <DeliveryCharge />
              </SuspenseGlobal>
            ),
          },
        ],
      },
      // income
      {
        path: "income",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <Income />
              </SuspenseGlobal>
            ),
          },
        ],
      },
      // Expenses
      {
        path: "expenses",
        children: [
          {
            path: "",
            element: (
              <SuspenseGlobal>
                <Expenses />
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
