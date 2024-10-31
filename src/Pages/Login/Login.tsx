import LoginImage from "../../Assets/Images/login-image.png";
import Logo from "../../Assets/Images/Transparent.png";
import { CButton, CInput } from "../../Utils";
import { useEffect, useState } from "react";
import CCheckRadio from "../../Utils/CCheckRadio/CCheckRadio";
import { useLoginMutation } from "../../Store/feature/Auth_slice/AuthApi_Slice";
import { loginDataType, errorType } from "../../Types/login_types";
import { useLocation, useNavigate } from "react-router-dom";
import { errorAlert } from "../../Utils/alert-function";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { decryptData, encryptData } from "../../constant/encrytion";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [data, setData] = useState<loginDataType>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<errorType>({
    error_for_username: false,
    error_for_password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const redirect = location.state?.from?.pathname || "/";

  const [
    login,
    { data: logginData, error: logginError, isLoading, isSuccess, isError },
  ] = useLoginMutation(); //method=post/delete/put

  // console.log(logginData, "logginData");
  // console.log(logginError, "logginError");

  useEffect(() => {
    if (isSuccess && logginData?.status === 200) {
      // Encrypt data and store it in localStorage
      const makeEncryptedData = encryptData(logginData?.data);
      if (makeEncryptedData) {
        localStorage.setItem("userData", makeEncryptedData);
        navigate(redirect, { replace: true });
      } else {
        console.error("Failed to encrypt data.");
      }
    }
  }, [isSuccess, logginData?.status, logginData?.data, navigate, redirect]);

  useEffect(() => {
    if (isError) {
      // alert(JSON.stringify(logginError?.data?.message))
      errorAlert({
        text: logginError?.data?.message,
      });
    }
  }, [isError, logginError?.data?.message]);

  // remember me
  useEffect(() => {
    const decryptedData = decryptData("rememberData");
    if (decryptedData?.rememberMe) {
      setData({
        username: decryptedData?.username || "",
        password: decryptedData?.password || "",
      });
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation for required fields
    const errors = {
      error_for_username: data.username === "",
      error_for_password: data.password === "",
    };
    setError(errors);

    // Exit if there are validation errors
    if (errors.error_for_username || errors.error_for_password) return;

    // Encrypt and store rememberMe data if needed
    if (rememberMe) {
      const encryptedData = encryptData({ ...data, rememberMe });
      if (encryptedData) {
        localStorage.setItem("rememberData", encryptedData);
      }
    } else {
      localStorage.removeItem("rememberData");
    }

    // Prepare login payload
    const body = {
      username: data.username,
      password: data.password,
    };

    try {
      await login(body);
    } catch (err) {
      console.error("Login error:", err);
      // Optionally, provide user feedback if login fails
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      {/* Left Side */}
      <section className="hidden md:flex md:flex-col md:w-1/2 h-full items-center justify-center">
        <div className="absolute top-5 left-5">
          <img src={Logo} alt="Logo" className="h-32" />
        </div>
        <div>
          <img
            src={LoginImage}
            alt="E-commerce Illustration"
            className="w-4/5 max-h-96"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            style={{ color: "transparent" }}
            sizes="100vw"
          />
        </div>
      </section>

      {/* Right Side */}
      <section className="flex flex-col w-full md:w-1/2 min-h-screen justify-center items-center bg-white px-8 py-12 md:px-16">
        <div className="w-full max-w-sm">
          <div className="md:hidden mb-8">
            <img src={Logo} alt="Logo" className="h-32 mx-auto" />
          </div>

          <h2 className="text-3xl font-semibold text-primary mb-4">
            Welcome to Hello Haat!
          </h2>
          <p className="text-gray-600 mb-8">Please sign-in to your account</p>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <CInput
                type="text"
                id="username"
                name="username"
                value={data.username}
                placeholder="Enter your username"
                label="Username"
                tooltip={error.error_for_username}
                tooltipPosition="right"
                tooltipContent="Username is required"
                errorQuery={error.error_for_username}
                tooltipVariant="error"
                onChange={(e) => {
                  setData({ ...data, username: e.target.value });
                  setError({ ...error, error_for_username: false });
                }}
              />
            </div>

            <div className="relative w-full">
              <CInput
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                placeholder="Enter your password"
                label="Password"
                tooltip={error.error_for_password}
                tooltipVariant="error"
                tooltipPosition="right"
                tooltipContent="Password is required"
                errorQuery={error.error_for_password}
                onChange={(e) => {
                  setError({ ...error, error_for_password: false });
                  setData({ ...data, password: e.target.value });
                }}
              />
              <div
                onClick={handleTogglePassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 cursor-pointer"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <CCheckRadio
                  type="checkbox"
                  label="Remember me"
                  className="mr-2"
                  id="remember-me"
                  name="remember-me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              </div>

              <section>
                <CButton
                  variant="outline"
                  btnTitle="Sign in"
                  fullWidth
                  className="mt-5"
                  loading={isLoading}
                />
              </section>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
