import { api } from "src/boot/axios";

const API_URL = "degree/";

const getDegrees = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(API_URL, config);

  return response;
};

const postDegree = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(API_URL, data, config);

  return response;
};

const updateDegree = async (token, id, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(`${API_URL}${id}`, data, config);

  return response;
};

const delDegree = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`${API_URL}${id}`, config);

  return response;
};


const degreeService = {
  getDegrees,
  postDegree,
  updateDegree,
  delDegree
};

export default degreeService;
