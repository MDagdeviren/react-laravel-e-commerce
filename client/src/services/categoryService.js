import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL;

const getCategories = () => {
  return axios
    .get(API_URL + "categories", { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const postCategory = (item) => {
  return axios
    .post(API_URL + "category", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const putCategory = (item) => {
  return axios
    .put(API_URL + "category", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const deleteCategory = (item) => {
  return axios
    .delete(API_URL + "category", { data: item, headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};

const categoryService = {
  getCategories,
  postCategory,
  putCategory,
  deleteCategory,
};
export default categoryService;
