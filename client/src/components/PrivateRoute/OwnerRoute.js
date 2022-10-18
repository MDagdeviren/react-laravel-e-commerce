import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
// import LoginPage from "../auth/LoginPage";

const useOwner = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(user)
  return (
    token &&
    token.user &&
    token.access_token &&
    (token.user.user_level === 1 || token.user.user_level === 2)
  );
};

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
