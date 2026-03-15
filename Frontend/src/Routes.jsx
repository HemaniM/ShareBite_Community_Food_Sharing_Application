import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AuthLayout from "./pages/Auth/AuthLayout";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditProfilePage from "./pages/Profile/EditProfilePage";
import ProfileOverview from "./pages/Profile/ProfileOverview";
import ReviewsPage from "./pages/Profile/ReviewsPage";
import RequestsPage from "./pages/Profile/RequestsPage";
import FoodPostsPage from "./pages/Profile/FoodPostsPage";
import CreateFoodPost from "./pages/Profile/CreateFoodPost";
import FoodPostRequestsPage from "./pages/Profile/FoodPostRequestsPage";
import CartPage from "./pages/Cart/CartPage";
import ProductPage from "./pages/Product/ProductPage";
import PublicProfilePage from "./pages/publicProfile/PublicProfilePage";
import ProductListingPage from "./pages/Product/ProductListingPage";

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
        path="/product/:productId/:productName"
        element={
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductListingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/:userId"
        element={
          <ProtectedRoute>
            <PublicProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
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
      >
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<ProfileOverview />} />
        <Route path="edit" element={<EditProfilePage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="food-posts" element={<FoodPostsPage />} />
        <Route path="food-posts/create-post" element={<CreateFoodPost />} />
        <Route
          path="food-posts/:postId/requests"
          element={<FoodPostRequestsPage />}
        />
        <Route path="history" element={<div>History</div>} />
      </Route>

      {/* <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
};

export default AppRoutes;
