import axios from "axios";
import authHeader from "./authHeader";
const API_URL = process.env.REACT_APP_API_URL;
export const getStoreAppeal = async (item) => {
  return await axios
    .post(API_URL + "store/getAppeal", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
export const postStoreAppeal = async (item) => {
  return await axios
    .post(API_URL + "store/application", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const putStoreAppeal = async (item) => {
  return await axios
    .post(API_URL + "store/postAppeal", item, { headers: authHeader() })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const deleteStoreAppeal = (item) => {
  return axios
    .delete(API_URL + "store/application", {
      data: item,
      headers: authHeader(),
    })
    .then((response) => response.data)
    .then((response) => {
      return response;
    });
};
const storeAppealService = {
  postStoreAppeal,
  getStoreAppeal,
  deleteStoreAppeal,
  putStoreAppeal,
};
export default storeAppealService;
