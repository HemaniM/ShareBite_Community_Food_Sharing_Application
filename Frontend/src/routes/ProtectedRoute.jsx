import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, status } = useAppSelector((state) => state.auth);

    if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
