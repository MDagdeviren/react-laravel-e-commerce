import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL;

export const allStoreProducts = (item) => {
  return axios
    .get(API_URL + "storeProduct/?page=" + item)
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};

export const getStoreProducts = (item) => {
  return axios
    .post(API_URL + "getStoreProducts", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};

export const postStoreProduct = (item) => {
  return axios
    .post(API_URL + "storeProduct", item, {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
export const putStoreProduct = (item) => {
  return axios
    .put(API_URL + "storeProduct", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
export const deleteStoreProduct = (item) => {
  return axios
    .delete(API_URL + "storeProduct", { data: item, headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      //   console.log(response);
      return response;
    });
};
const storeProductService = {
  getStoreProducts,
  postStoreProduct,
  putStoreProduct,
  deleteStoreProduct,
};
export default storeProductService;
