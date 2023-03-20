import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL;

const postEmployee = (item) => {
  return axios
    .post(API_URL + "store/addEmployee", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const getEmployees = (item) => {
  return axios
    .post(API_URL + "store/getEmployees", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const storeEmployeeService = {
  postEmployee,
  getEmployees,
};
export default storeEmployeeService;
