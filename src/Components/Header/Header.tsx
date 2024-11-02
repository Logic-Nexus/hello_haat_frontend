import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import navLinks from "../../constant/navLinks";
import mainLogo from "../../assets/mainLogo.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useWindowSize from "../../Hook/useWindowSize";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { CButton } from "../../Utils";
// import { useAppSelector } from "../../Store/Store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const width = useWindowSize();

  // const { authorizeVendorDetails, profileData } = useAppSelector(
  //   (state) => state.globalSlice
  // );
  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    //clear cookies
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // redirect to login
    navigate("/login");
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-[#FFFFFF] p-3 text-black rounded shadow-sm mt-2">
        {/* left section */}
        <section className="flex items-center space-x-2">
          <img src={mainLogo} alt="logo" className="w-10 h-10 object-contain" />
          <h1 className="font-bold text-black text-[20px]  md:block hidden">
            devLinks
          </h1>
        </section>

        {/* middle section */}
        <section className="flex space-x-4">
          {navLinks?.map((link) => (
            <NavLink
              key={link.name}
              to={link?.path ?? "#"}
              className={({ isActive }) =>
                isActive
                  ? "text-main_color font-semibold bg-purple-100 rounded-md py-2 px-5"
                  : " font-semibold hover:text-main_color hover:bg-main_light_color rounded-md py-2 px-5 bg-gray-100 text-gray-500"
              }
            >
              <section className="flex items-center space-x-2">
                {link.icon && <link.icon />}
                <span
                  className="text-[13px]
                  md:block hidden
                "
                >
                  {link.name}
                </span>
              </section>
            </NavLink>
          ))}
        </section>

        {/* right section */}
        <section className="flex space-x-4">
          <CButton variant="solid" onClick={() => navigate("/preview")}>
            {width < 768 ? <MdOutlineRemoveRedEye size={20} /> : "Preview"}
          </CButton>
          <CButton
            variant="solid"
            color="bg-red-600 hover:bg-red-400 text-white"
            onClick={() => handleLogout()}
          >
            <RiLogoutCircleRFill size={20} />
          </CButton>
        </section>
      </nav>
    </>
  );
};

export default Header;
