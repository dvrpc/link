import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const AuthenticatedLayout = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user && !user.email_verified) {
    return <Navigate to="/verify-email" />;
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
