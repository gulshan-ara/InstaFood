import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);
  
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: "/cart", isToaster: true }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
