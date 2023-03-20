import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useOwner } from "../../hooks/PrivateRouteHooks";

const PrivateRoute = () => {
  const location = useLocation();
  const isOWner = useOwner();

  return isOWner ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
export default PrivateRoute;
