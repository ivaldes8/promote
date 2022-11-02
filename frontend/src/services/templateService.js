import { api } from "src/boot/axios";

const API_URL = "template/";

const getTemplates = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(API_URL, config);

  return response;
};

const postTemplate = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(API_URL, data, config);

  return response;
};

const updateTemplate = async (token, id, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(`${API_URL}${id}`, data, config);

  return response;
};

const delTemplate = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`${API_URL}${id}`, config);

  return response;
};


const templateService = {
  getTemplates,
  postTemplate,
  updateTemplate,
  delTemplate
};

export default templateService;
