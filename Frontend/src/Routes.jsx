import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AuthLayout from "./pages/Auth/AuthLayout";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditProfilePage from "./pages/Profile/EditProfilePage";

import ProtectedRoute from "./routes/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes (START of website) */}
      <Route element={<AuthLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
