import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/PrivateRouteHooks";

const PrivateRoute = () => {
  const location = useLocation();
  const isAuth = useAuth();

  return isAuth ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
};
export default PrivateRoute;
