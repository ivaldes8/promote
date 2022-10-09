import { api } from "src/boot/axios";

const API_URL = "home";

const getHome = async () => {
  const response = await api.get(API_URL);

  return response;
};

const homeService = {
  getHome
}

export default homeService
