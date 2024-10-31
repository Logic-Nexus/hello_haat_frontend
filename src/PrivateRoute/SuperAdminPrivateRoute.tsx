// Super Admin PrivateRoute

import React from "react";
import { Navigate } from "react-router-dom";
import { decryptData } from "../constant/encrytion";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function SuperAdminPrivateRoute({
  children,
}: PrivateRouteProps) {
  const userData = decryptData("userData");
  // const token = JSON.parse(userData)?.accessToken;
  const token = userData?.accessToken;
  // console.log(token);
  const isAuthenticated = token ? true : false;

  //check is user has vendorId
  const isSuperAdmin = userData?.user?.role === "SUPER_ADMIN";
  // console.log(isSuperAdmin, "isSuperAdmin");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && !isSuperAdmin) {
    return <Navigate to="/vendor" replace />;
  }

  return <>{children}</>;
}
