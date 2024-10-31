// PrivateRoute

import React from "react";
import { Navigate } from "react-router-dom";
import SocketProvider from "../Context/SocketProvider/SocketProvider";
import GlobalProvider from "../Context/GlobalProvider/GlobalProvider";
import { decryptData } from "../constant/encrytion";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const userData = decryptData("userData");
  // const token = JSON.parse(userData)?.accessToken;
  const token = userData?.accessToken;
  // console.log(token);
  const isAuthenticated = token ? true : false;

  //check is user has vendorId
  const isSuperAdmin = userData?.user?.role === "SUPER_ADMIN";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && isSuperAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <GlobalProvider>
        <SocketProvider>{children}</SocketProvider>
      </GlobalProvider>
    </>
  );
}
