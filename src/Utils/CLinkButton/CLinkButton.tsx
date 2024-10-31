import React from "react";
import { Link } from "react-router-dom";

const CLinkButton = ({
  href,
  children,
  target = "_self",
  query,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  query?: any;
}) => {
  return (
    <>
      <Link
        to={{
          pathname: href,
          search: query ? `?${new URLSearchParams(query)}` : "",
        }}
        className="text-xs md:text-sm text-light-primary dark:text-warning border-2 border-light-primary dark:border-dark-primary rounded px-2 py-1 hover:bg-light-primary hover:text-white transition-all duration-300"
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : ""}
      >
        {children}
      </Link>
    </>
  );
};

export default CLinkButton;
