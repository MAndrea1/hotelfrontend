import axios from "axios";
const API_URL = "http://localhost:8080/registration/";

const register = (email, password, firstName, lastName, phone, country, role) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
    firstName,
    lastName,
    phone,
    country,
    role
  });
};

const login = async (email, password) => {
  const response = await axios
    .post(API_URL + "login", {
      email,
      password,
    });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.clear()
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getCurrentBookingData = () => {
  return JSON.parse(localStorage.getItem("bookingData"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentBookingData,
};

export default AuthService;