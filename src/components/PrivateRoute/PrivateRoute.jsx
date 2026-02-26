import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROLES } from "../../constants/roles";
import { ROUTES } from "../../constants/routes";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user, isLoggedIn } = useAuth();
  const role = user?.role?.toUpperCase();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === ROLES.ADMIN) return <Navigate to={ROUTES.ADMIN_PANEL} replace />;
    if (role === ROLES.USER) return <Navigate to={ROUTES.SHOP} replace />;
  }

  return children;
}
