import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/PrivateRouteHooks";

const PrivateRoute = () => {
  const location = useLocation();
  const isAuth = useAuth();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
export default PrivateRoute;
