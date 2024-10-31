import { useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { IoLogOut, IoMenu } from "react-icons/io5";
import Logo from "../../Assets/Images/Transparent.png";

import { CButton } from "../../Utils";
import SideNav from "../../Components/Nav/SideNav/SideNav";
import Layout from "../../Layout/Layout";
import { useAppSelector } from "../../Store/Store";

const Home = () => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile state
  const { authorizeVendorDetails } = useAppSelector(
    (state) => state.globalSlice
  ) as any;

  // console.log(authorizeVendorDetails);

  // Toggle the sidebar collapse state for desktop

  // Toggle the sidebar visibility for mobile
  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <main className="flex lg:h-[calc(100vh-5rem)] h-full">
      {/* Sidebar for Desktop and Mobile */}
      <SideNav
        isMobileOpen={isMobileOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />
      {/* Mobile Overlay (Only visible when sidebar is open on mobile) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Nav */}
        <nav>
          <section className="flex justify-between items-center border-b border-gray-200 px-4 shadow-sm h-[5rem]">
            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMobileSidebar}
              className="text-gray-800 p-2 rounded-md lg:hidden"
            >
              <IoMenu className="text-3xl" />
            </button>

            <aside>
              <img
                src={authorizeVendorDetails?.vendor_image?.url || Logo}
                alt="logo"
                className="w-[4rem] h-[4rem] object-cover rounded-full  shadow-lg"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </aside>
            <aside>
              <CButton
                variant="contained"
                circle
                className="w-10 h-10 rounded-full "
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
            </aside>
          </section>
        </nav>
        {/* Outlet to render child components */}

        <section className="px-2">
          <Layout>
            <Outlet />
          </Layout>
        </section>
      </div>
    </main>
  );
};

export default Home;
