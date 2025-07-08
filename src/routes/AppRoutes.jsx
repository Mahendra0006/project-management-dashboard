import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProjectDetails from "../pages/ProjectDetails";
import Settings from "../pages/Settings";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:projectId" // ✅ Updated from /projects/:projectId
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Root route and catch-all */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
