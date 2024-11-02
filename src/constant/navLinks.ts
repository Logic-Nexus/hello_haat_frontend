import { FaLink } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IconType } from "react-icons";
import { TbFilePower } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";

type NavItem = {
  name: string;
  path?: string;
  icon?: IconType;
  children?: NavItem[];
};

const navLinks: NavItem[] = [
  {
    name: "Dashboard",
    icon: CgProfile,
    path: "/vendor",
  },
  {
    name: "All Orders",
    icon: CgProfile,
    path: "all_orders",
  },

  {
    name: "User Management",
    icon: FaLink,
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
    icon: TbFilePower,
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
    icon: TbFilePower,
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
    icon: TbFilePower,
    children: [
      {
        name: "Coupon",
        path: "coupon",
        icon: AiFillProduct,
      },
      {
        name: "Banner",
        path: "banner",
        icon: AiFillProduct,
      },
    ],
  },
  {
    name: "Service",
    icon: TbFilePower,
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
    icon: TbFilePower,
    children: [
      {
        name: "Business Report",
        path: "business_report",
        icon: AiFillProduct,
      },
      {
        name: "Stock Report",
        path: "stock_report",
        icon: AiFillProduct,
      },
    ],
  },
  {
    name: "Settings",
    icon: TbFilePower,
    children: [
      {
        name: "Admin Settings",
        path: "admin_settings",
        icon: AiFillProduct,
      },
      {
        name: "Zone Settings",
        path: "zone",
        icon: AiFillProduct,
      },
      {
        name: "Delivery Charge Settings",
        path: "delivery_charge_settings",
        icon: AiFillProduct,
      },
    ],
  },
];

export default navLinks;
