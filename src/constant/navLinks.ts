import { FaLink } from "react-icons/fa6";
// import { CgProfile } from "react-icons/cg";
import { IconType } from "react-icons";
// import { TbFilePower } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";

import dashboard from "/public/svg/dashboard.svg";
import order from "/public/svg/order.svg";
import userManagement from "/public/svg/userManagement.svg";
import productsManagement from "/public/svg/productsManagement.svg";
import profitLoss from "/public/svg/profitLoss.svg";
import promotion from "/public/svg/promotion.svg";
import service from "/public/svg/service.svg";
import reports from "/public/svg/reports.svg";
import settings from "/public/svg/settings.svg";

type NavItem = {
  name: string;
  path?: string;
  icon?: IconType;
  image?: React.ReactNode;
  children?: NavItem[];
};

const navLinks: NavItem[] = [
  {
    name: "Dashboard",
    image: dashboard,
    path: "/vendor",
  },
  {
    name: "All Orders",
    // icon: CgProfile,
    image: order,
    path: "all_orders",
  },

  {
    name: "User Management",
    // icon: FaLink,
    image: userManagement,
    children: [
      {
        name: "Employees",
        path: "employees",
        icon: FaLink,
      },
      {
        name: "Customers",
        path: "customers",
        icon: FaLink,
      },
      {
        name: "Suppliers",
        path: "suppliers",
        icon: FaLink,
      },
    ],
  },

  {
    name: "Product Management",
    // icon: TbFilePower,
    image: productsManagement,
    children: [
      {
        name: "Product",
        path: "products",
        icon: AiFillProduct,
      },
      {
        name: "Product Category",
        path: "product_category",
        icon: AiFillProduct,
      },
      {
        name: "Purchase",
        path: "purchase",
        icon: AiFillProduct,
      },
      {
        name: "Sales",
        path: "sales",
        icon: AiFillProduct,
      },
    ],
  },
  {
    name: "Income & Expenses",
    // icon: TbFilePower,
    image: profitLoss,
    children: [
      {
        name: "Income",
        path: "income",
        icon: AiFillProduct,
      },
      {
        name: "Expenses",
        path: "expenses",
        icon: AiFillProduct,
      },
      {
        name: "Withdrawal",
        path: "withdrawal",
        icon: AiFillProduct,
      },
      {
        name: "Payment",
        path: "payment",
        icon: AiFillProduct,
      },
    ],
  },
  {
    name: "Promotion Management",
    // icon: TbFilePower,
    image: promotion,
    children: [
      {
        name: "Coupon",
        path: "coupon",
        // icon: AiFillProduct,
        image: promotion,
      },
      {
        name: "Banner",
        path: "banner",
        // icon: AiFillProduct,
        image: promotion,
      },
    ],
  },
  {
    name: "Service",
    // icon: TbFilePower,
    image: service,
    children: [
      {
        name: "Mobile Recharge",
        path: "mobile_recharge",
        icon: AiFillProduct,
      },
      {
        name: "Mobile Banking",
        path: "mobile_banking",
        icon: AiFillProduct,
      },
      {
        name: "Online Service",
        path: "online_service",
        icon: AiFillProduct,
      },
    ],
  },
  {
    name: "Reports",
    // icon: TbFilePower,
    image: reports,
    children: [
      {
        name: "Business Report",
        path: "business_report",
        // icon: AiFillProduct,
        image: reports,
      },
      {
        name: "Stock Report",
        path: "stock_report",
        // icon: AiFillProduct,
        image: reports,
      },
    ],
  },
  {
    name: "Settings",
    // icon: TbFilePower,
    image: settings,
    children: [
      {
        name: "Admin Settings",
        path: "admin_settings",
        // icon: AiFillProduct,
        image: settings,
      },
      {
        name: "Zone Settings",
        path: "zone",
        // icon: AiFillProduct,
        image: settings,
      },
      {
        name: "Delivery Charge Settings",
        path: "delivery_charge_settings",
        // icon: AiFillProduct,
        image: settings,
      },
    ],
  },
];

export default navLinks;
