import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AuthLayout from "./pages/Auth/AuthLayout";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditProfilePage from "./pages/Profile/EditProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes (START of website) */}
      <Route element={<AuthLayout />}>
        {/* DEFAULT route */}
        <Route index element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* After login */}
      <Route path="/home" element={<Homepage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
