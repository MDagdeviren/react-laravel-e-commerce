import axios from "axios";
import authHeader from "./authHeader";
const token = JSON.parse(localStorage.getItem("token"));
const API_URL = process.env.REACT_APP_API_URL;

const getStores = () => {
  return axios
    .get(API_URL + "storeList", { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};

const getStoreInfo = () => {
  return axios
    .get(API_URL + "store/" + token.user.store_id, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
export const putStore = (item) => {
  return axios
    .post(API_URL + "store", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const putLogo = (item) => {
  return axios
    .post(API_URL + "store/updateLogo", item, {
      headers: authHeader("multipart/form-data"),
    })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const putCover = (item) => {
  return axios
    .post(API_URL + "store/updateCover", item, {
      headers: authHeader("multipart/form-data"),
    })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};

const storeService = {
  getStores,
  getStoreInfo,
  putLogo,
  putCover,
  putStore,
};
export default storeService;
