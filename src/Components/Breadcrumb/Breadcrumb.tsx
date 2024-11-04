import React from "react";
import { Link, useLocation } from "react-router-dom";
import textFormatter from "text-formatter-js";

// Breadcrumb Component
const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  //   console.log(pathnames);

  if (pathnames.length === 1) {
    return null;
  }

  return (
    <nav
      className="flex mt-2 mx-1 bg-white px-4 py-2 rounded shadow"
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
                    className="text-gray-700 hover:text-gray-900 hover:underline text-sm"
                  >
                    {textFormatter(value)}
                  </Link>
                  <span className="mx-2 text-gray-400">/</span>
                </>
              ) : (
                <section className="text-sm">
                  <span className="text-gray-500"> {textFormatter(value)}</span>
                </section>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
