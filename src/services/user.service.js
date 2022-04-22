import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/";
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "bookings/1044", { headers: authHeader() });
};
const getSuperadminBoard = () => {
  return axios.get(API_URL + "superadmin", { headers: authHeader() });
};
const UserService = {
  getPublicContent,
  getUserBoard,
  getSuperadminBoard,
  getAdminBoard,
};
export default UserService;