import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { useLocation } from "react-router";
// import LoginPage from "../auth/LoginPage";

const useAuth = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(user)
  return token && token.user && token.access_token;
};

const PrivateRoute = () => {
  const location = useLocation();
  const isAuth = useAuth();
  // console.log(isAuth)
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
export default PrivateRoute;
