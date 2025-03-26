import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { token, role, isAuthenticated } = useSelector((state) => state.auth);
  console.log("ProtectedRoute check:", { token, role, isAuthenticated });

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Vérification du rôle avec includes()
  if (requiredRole && !requiredRole.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
