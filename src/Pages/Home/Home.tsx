import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoLogOut, IoMenu } from "react-icons/io5";
import Logo from "/public/images/Transparent.png";
import { CButton } from "../../Utils";
import SideNav from "../../Components/Nav/SideNav/SideNav";
import Layout from "../../Layout/Layout";
import { useAppSelector } from "../../Store/Store";
import { decryptData } from "../../constant/encrytion";

const Home = () => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile state
  const { authorizeVendorDetails } = useAppSelector(
    (state) => state.globalSlice
  ) as any;

  const loginUserInfo = decryptData("userData")?.user || "";
  // Toggle sidebar visibility for mobile
  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <main className="grid lg:grid-cols-[auto_1fr] lg:h-[calc(100vh-5rem)] h-full">
      {/* Sidebar for Desktop and Mobile */}
      <aside
        className={`fixed lg:relative z-40 lg:z-auto transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 bg-gray-800`}
      >
        <SideNav
          isMobileOpen={isMobileOpen}
          toggleMobileSidebar={toggleMobileSidebar}
        />
      </aside>

      {/* Mobile Overlay (Visible when sidebar is open on mobile) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <nav className="flex justify-between items-center border-b border-gray-200 px-4 shadow-sm h-[5rem] bg-white z-20">
          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileSidebar}
            className="text-gray-800 p-2 rounded-md lg:hidden"
          >
            <IoMenu className="text-3xl" />
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <img
              src={authorizeVendorDetails?.vendor_image?.url || Logo}
              alt="logo"
              className="w-[4rem] h-[4rem] object-cover rounded-full shadow-lg"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Logout Button */}
          <div className="flex items-center">
            <span
              className="
            text-primary mr-4 font-semibold text-sm
            lg:text-md lg:mr-8
            dark:text-gray-100
              bg-gray-200 dark:bg-gray-800
              px-2 py-1 rounded
            "
            >
              {loginUserInfo?.role}
            </span>
            <CButton
              variant="contained"
              circle
              className="w-10 h-10 rounded-full"
              id="logout"
              tooltip
              tooltipContent="Logout"
              onClick={() => {
                localStorage.setItem("userData", "{}");
                navigate("/login");
              }}
            >
              <IoLogOut className="text-2xl" />
            </CButton>
          </div>
        </nav>

        {/* Main Content Area */}
        <section className="flex-1 overflow-x-auto overflow-y-auto px-2 bg-gray-50">
          <Layout>
            <Outlet />
          </Layout>
        </section>
      </div>
    </main>
  );
};

export default Home;
