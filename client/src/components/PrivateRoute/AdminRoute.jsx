import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useAdmin } from "../../hooks/PrivateRouteHooks";

const AdminRoute = () => {
  const location = useLocation();
  const isAdmin = useAdmin();

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
export default AdminRoute;
