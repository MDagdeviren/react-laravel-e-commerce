import axios from "axios";
import authHeader from "./authHeader";
import jwt_decode from "jwt-decode";
const API_URL = "http://127.0.0.1:8000/api/auth/";

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
      // console.log(response);
      const decoded = jwt_decode(response.token.access_token);
      // console.log(decoded.user[0]);
      // const user = {
      //   user: decoded.user[0],
      //   token: response.token,
      // };
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
