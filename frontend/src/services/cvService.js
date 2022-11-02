import { api } from "src/boot/axios";

const API_URL = "cv/";

const getCvs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`${API_URL}all`, config);

  return response;
};

const postCv = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(API_URL, data, config);

  return response;
};

const updateCv = async (token, id, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(`${API_URL}${id}`, data, config);

  return response;
};

const delCv = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`${API_URL}${id}`, config);

  return response;
};


const cvService = {
  getCvs,
  postCv,
  updateCv,
  delCv
};

export default cvService;
