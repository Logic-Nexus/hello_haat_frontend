import React from "react";

const Home = React.lazy(() => import("../Pages/Home/Home"));
const Error = React.lazy(() => import("../Components/Error/Error"));
const Login = React.lazy(() => import("../Pages/Login/Login"));
const Products = React.lazy(
  () => import("../Pages/Product_management/Products")
);
const Dashboard = React.lazy(() => import("../Pages/Dashboard/Dashboard"));
const Product_category = React.lazy(
  () => import("../Pages/Product_management/Product Category")
);
const AddProductCategory = React.lazy(
  () =>
    import(
      "../Pages/Product_management/Product Category/AddProductCategory/AddProductCategory"
    )
);

// Employees
const Employees = React.lazy(
  () => import("../Pages/UserManagement/Employees/Employees")
);
const CreateEmployee = React.lazy(
  () => import("../Pages/UserManagement/Employees/CreateEmployee")
);
// Customers
const Customers = React.lazy(() => import("../Pages/UserManagement/Customers"));

const AddNewProducts = React.lazy(
  () =>
    import("../Pages/Product_management/Products/AddNewProducts/AddNewProducts")
);

const Zone = React.lazy(() => import("../Pages/Settings/Zone"));
const Vendors = React.lazy(() => import("../Pages/Vendors"));
export {
  Home,
  Error,
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
  Zone,
};
