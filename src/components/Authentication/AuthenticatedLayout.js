import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const AuthenticatedLayout = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin =
    user &&
    user["https://connect.cloud.dvrpc.org/roles"] &&
    user["https://connect.cloud.dvrpc.org/roles"].includes("admin");

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
