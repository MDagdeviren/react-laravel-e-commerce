import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://127.0.0.1:8000/api/";
export const getProductInfo = (id) => {
  return axios
    .get(API_URL + "productInfo/" + id, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};

export const getProducts = () => {
  return axios
    .get(API_URL + "products", { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
//Multipart-form data ?
export const postProduct = (item) => {
  return axios
    .post(API_URL + "product", item, {
      headers: authHeader("multipart/form-data"),
    })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
export const putProduct = (item) => {
  return axios
    .put(API_URL + "product", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
export const deleteProduct = (item) => {
  return axios
    .delete(API_URL + "product", { data: item, headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      console.log("response");
      return response;
    });
};
const productService = {
  getProducts,
  postProduct,
  putProduct,
  deleteProduct,
};
export default productService;
