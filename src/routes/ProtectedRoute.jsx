import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const user = useSelector((state) => state.auth.user);
  const toastId = "auth-warning";
  if (!user) {
    if (!toast.isActive(toastId)) {
      toast.warning("Please log in to access this page", { toastId });
    }
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    toast.error(`Access denied. Required roles: ${allowedRoles.join(", ")}`);
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
