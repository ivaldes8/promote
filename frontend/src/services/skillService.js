import { api } from "src/boot/axios";

const API_URL = "skill/";

const getSkills = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`${API_URL}me`, config);

  return response;
};

const postSkill = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(API_URL, data, config);

  return response;
};

const updateSkill = async (token, id, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(`${API_URL}${id}`, data, config);

  return response;
};

const delSkill = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`${API_URL}${id}`, config);

  return response;
};


const skillService = {
  getSkills,
  postSkill,
  updateSkill,
  delSkill
};

export default skillService;
