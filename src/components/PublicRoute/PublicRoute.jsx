import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PublicRoute({ children }) {
  const { user, isLoggedIn } = useAuth();
  const role = user?.role?.toLowerCase();

  if (isLoggedIn) {
    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "user") return <Navigate to="/shop" replace />;
  }

  return children;
}
