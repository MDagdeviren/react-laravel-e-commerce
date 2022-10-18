import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://127.0.0.1:8000/api/";

export const getSubCategories = () => {
  return axios
    .get(API_URL + "subCategories", { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
export const postSubCategory = (item) => {
  return axios
    .post(API_URL + "subCategory", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
export const putSubCategory = (item) => {
  return axios
    .put(API_URL + "subCategory", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
export const deleteSubCategory = (item) => {
  return axios
    .delete(API_URL + "subCategory", { data: item, headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const categoryService = {
  getSubCategories,
  postSubCategory,
  putSubCategory,
  deleteSubCategory,
};
export default categoryService;
