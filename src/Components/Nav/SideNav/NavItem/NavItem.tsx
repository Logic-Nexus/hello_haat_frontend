import { useState, useEffect, useCallback } from "react";
import { IconType } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";

const NavItem = ({
  Icon,
  image,
  label,
  isCollapsed,
  path,
  toggleMobileSidebar,
  children,
}: {
  Icon: IconType;
  image: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  toggleMobileSidebar: () => void;
  path?: string | "";
  children?: any[];
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to check if a given path is active
  const isActive = useCallback(
    (currentPath: string | undefined) => {
      if (!currentPath) return false;
      return location.pathname === `/${currentPath}`;
    },
    [location.pathname]
  );

  // Function to check if any child path is active
  const isAnyChildActive = useCallback(() => {
    if (!children) return false;
    return children?.some((child) => isActive(child.path));
  }, [children, isActive]);

  // Initialize the isOpen state based on whether any child route is active
  const [isOpen, setIsOpen] = useState(isAnyChildActive());

  // Keep the menu open if any child route is active when location changes
  useEffect(() => {
    if (isAnyChildActive()) {
      setIsOpen(true);
    }
  }, [isAnyChildActive, location?.pathname]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <main className="w-full">
      <div
        onClick={toggleOpen}
        className={`flex items-center rounded-md cursor-pointer text-white transition-colors duration-200 ${
          isCollapsed ? "justify-center" : "justify-between"
        } ${isActive(path) ? "bg-gray-700" : ""}`} // Highlight if active
      >
        <button
          onClick={() => {
            if (!path) return;
            navigate(path);
            toggleMobileSidebar();
          }} // Navigate on click
          className={`flex items-center p-2 rounded-md cursor-pointer w-full transition-colors duration-200 ${
            isCollapsed ? "justify-center" : ""
          } ${isActive(path) ? "bg-gray-700" : ""}`}
        >
          <div className="text-center">
            {typeof image === "string" && (
              <img src={image} alt="icon" className="w-5 h-5" />
            )}
            {Icon && <Icon className={`w-5 h-5`} />}
          </div>
          {/* Show the label only if the sidebar is not collapsed */}
          {!isCollapsed && <span className="ml-4 text-sm">{label}</span>}
        </button>

        {/* Show the expand/collapse button only if the sidebar is not collapsed */}
        {children && (
          <button onClick={toggleOpen} className="ml-auto p-2">
            {isOpen ? "▼" : "►"}
          </button>
        )}
      </div>

      {/* Render children if they exist */}
      {children && (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
          style={{ maxHeight: isOpen ? "200px" : "0px" }}
        >
          <div className="pl-6 flex flex-col space-y-1 mt-2">
            {children.map((child) => (
              <button
                key={child.name}
                onClick={() => {
                  navigate(child.path);
                  toggleMobileSidebar();
                }} // Navigate on click
                className={`flex items-center p-2 rounded-md text-white transition-colors duration-200 ${
                  isActive(child?.path) ? "bg-gray-600" : ""
                }`}
              >
                {/* Show child icon */}
                <div className="text-center">
                  {/* {child.icon && <child.icon className={`w-5 h-5`} />} */}

                  {child.icon && <child.icon className={`w-5 h-5`} />}
                  {typeof child.image === "string" && (
                    <img src={child.image} alt="icon" className="w-5 h-5" />
                  )}
                </div>
                {/* Show the label only if the sidebar is not collapsed */}
                {!isCollapsed && (
                  <span className="ml-4 text-sm">{child.name}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default NavItem;
