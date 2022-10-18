import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://127.0.0.1:8000/api/";
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

const categoryService = {
  getApprovalStores,
  postApprovalStore,
};
export default categoryService;
