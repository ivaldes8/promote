import { api } from "src/boot/axios";

const API_URL = "users/";

const login = async (data) => {
  const response = await api.post(`${API_URL}login`, data);

  return response;
};

const register = async (data) => {
  const response = await api.post(API_URL, data);

  return response;
};

const authService = {
  login,
  register
}

export default authService
