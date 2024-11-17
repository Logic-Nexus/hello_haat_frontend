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
const EditEmployee = React.lazy(
  () => import("../Pages/UserManagement/Employees/EditEmployee")
);

// Customers
const Customers = React.lazy(() => import("../Pages/UserManagement/Customers"));

// Suppliers
const Suppliers = React.lazy(() => import("../Pages/UserManagement/Suppliers"));
const CreateSupplier = React.lazy(
  () =>
    import("../Pages/UserManagement/Suppliers/createSupplier/CreateSupplier")
);
const AddNewProducts = React.lazy(
  () =>
    import("../Pages/Product_management/Products/AddNewProducts/AddNewProducts")
);
// settings
const Zone = React.lazy(() => import("../Pages/Settings/Zone"));
const DeliveryCharge = React.lazy(() => import("../Pages/Settings/DeliveryCharge"));

const CreateZone = React.lazy(
  () => import("../Pages/Settings/Zone/CreateZone/CreateZone")
);
const Vendors = React.lazy(() => import("../Pages/Vendors"));
const PurchaseProduct = React.lazy(
  () => import("../Pages/Product_management/PurchaseProduct")
);

const StockReport = React.lazy(() => import("../Pages/Reports/StockReport"));
// promotion management
const Coupon = React.lazy(() => import("../Pages/PromotionManagement/Coupon"));
const CreateProductPurchase = React.lazy(
  () =>
    import(
      "../Pages/Product_management/PurchaseProduct/CreateProductPurchase/CreateProductPurchase"
    )
);
const AllOrders = React.lazy(() => import("../Pages/AllOrders"));
// Income and Expenses
const Income = React.lazy(() => import("../Pages/IncomeAndExpenses/Income"));
const Expenses = React.lazy(() => import("../Pages/IncomeAndExpenses/Expenses"));

export {
  Home,
  Error,
  Login,
  Products,
  Dashboard,
  Product_category,
  Employees,
  CreateEmployee,
  EditEmployee,
  AddProductCategory,
  Customers,
  AddNewProducts,
  Vendors,
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
  Expenses,
};
