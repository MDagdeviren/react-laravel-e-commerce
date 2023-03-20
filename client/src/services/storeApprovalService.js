import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL;
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
