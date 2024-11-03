import React, { useState } from "react";
// import Logo from "../../../Assets/Images/Hello Hatt white.png";
import NavItem from "./NavItem/NavItem";
import { CButton } from "../../../Utils";
import { For } from "easy-beauty-components---react";
import navLinks from "../../../constant/navLinks";
import { IconType } from "react-icons";

const SideNav = ({
  isMobileOpen,
  toggleMobileSidebar,
}: {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={`fixed lg:relative top-0 h-screen  left-0 z-40 transition-all duration-300 ease-in-out ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0
      ${
        isCollapsed ? "w-28" : "w-[18rem]"
      } bg-primary flex flex-col lg:relative `}
    >
      {/* Logo and Collapse Button */}
      <div
        className={`flex items-center
            ${
              isCollapsed ? "justify-center" : "justify-between"
            }  px-4 border-b border-gray-200 gap-3 shadow-lg h-[5rem]`}
      >
        {!isCollapsed && (
          <img src={""} alt="logo" className="w-2/5 h-auto object-contain" />
        )}
        <CButton
          variant="contained"
          onClick={toggleSidebar}
          circle
          className="text-white p-2 rounded-full hover:bg-gray-700 transition border border-white w-8 h-8 "
        >
          {isCollapsed ? "→" : "←"}
        </CButton>
        {/* Mobile Close Button */}
        <section className="lg:hidden">
          <CButton
            variant="contained"
            onClick={toggleMobileSidebar}
            className="text-white p-2 rounded-full hover:bg-gray-700 transition border border-red-400 w-8 h-8 "
          >
            X
          </CButton>
        </section>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 max-h-screen overflow-y-auto">
        <For of={navLinks}>
          {(link, index) => (
            <React.Fragment key={link?.name + index}>
              <NavItem
                Icon={link.icon as IconType}
                label={link.name}
                isCollapsed={isCollapsed}
                path={link.path}
                children={link.children} // Pass children if they exist
              />
            </React.Fragment>
          )}
        </For>
      </nav>
    </aside>
  );
};

export default SideNav;
