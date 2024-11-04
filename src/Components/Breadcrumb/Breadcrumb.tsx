import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import textFormatter from "text-formatter-js";
import { IoArrowBackCircleSharp } from "react-icons/io5";

// Breadcrumb Component
const Breadcrumb: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  //   console.log(pathnames);

  if (pathnames.length === 1) {
    return null;
  }

  return (
    <nav
      className="flex mt-2 mx-1 bg-white px-4 py-2 rounded shadow justify-between"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-1">
        {pathnames?.map((value, index) => {
          // Construct the route to this part of the breadcrumb
          // vendor/product_category/create_product_category
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="inline-flex items-center">
              {!isLast ? (
                <>
                  <Link
                    to={to}
                    className="text-gray-700 hover:text-gray-900 hover:underline sm:text-sm text-xs"
                  >
                    {textFormatter(value)}
                  </Link>
                  <span className="mx-1 text-gray-400">/</span>
                </>
              ) : (
                <section className="sm:text-sm text-xs">
                  <span className="text-gray-500"> {textFormatter(value)}</span>
                </section>
              )}
            </li>
          );
        })}
      </ol>
      {/* //button for back to previous page if in nested route */}
      <IoArrowBackCircleSharp
        style={{
          display: pathnames.length <= 2 ? "none" : "block",
        }}
        className="text-primary text-2xl cursor-pointer w-8 h-8"
        onClick={() => {
          navigate(-1);
        }}
      />
    </nav>
  );
};

export default Breadcrumb;
