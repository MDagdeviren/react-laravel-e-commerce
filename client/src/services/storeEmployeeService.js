import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://127.0.0.1:8000/api/";

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
