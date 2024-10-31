import React from "react";
import Breadcrumb from "../Components/Breadcrumb/Breadcrumb";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Breadcrumb />
      <main
        className="
      lg:h-[calc(100vh-7rem)]
      h-full
      flex-1
      overflow-y-scroll no-scrollbar
    "
      >
        <section className="mt-2">{children}</section>
      </main>
    </>
  );
};

export default Layout;
