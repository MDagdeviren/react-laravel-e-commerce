import axios from "axios";
import authHeader from "./authHeader";
import jwt_decode from "jwt-decode";
const API_URL = process.env.REACT_APP_API_URL;

const register = (name, email, password, key) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
    key,
  });
};

const login = (item) => {
  return axios
    .post(API_URL + "login", item)
    .then((response) => response.data)
    .then((response) => {
      const decoded = jwt_decode(response.token.access_token);

      const user = { ...response.token, user: decoded.user[0] };
      if (response.token.access_token) {
        localStorage.setItem("token", JSON.stringify(user));
      }
      return response;
    });
};
const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
