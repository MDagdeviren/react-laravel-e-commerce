import axios from "axios";
import authHeader from "./authHeader";
const token = JSON.parse(localStorage.getItem("token"));
const API_URL = "http://127.0.0.1:8000/api/";

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

/*
const getApprovalStores = () => {
  return axios
    .get(API_URL + "approvalList", { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const postApprovalStore = (item) => {
  return axios
    .post(API_URL + "store/approval", item, { headers: authHeader() })
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
      // console.log(response);
      return response;
    });
};*/

const storeService = {
  getStores,
  getStoreInfo,
  putLogo,
  putCover,
  putStore,
  //   postApprovalStore,
  //   putCategory,
  //   deleteCategory,
  //   getApprovalStores,
};
export default storeService;
