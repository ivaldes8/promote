import { api } from "src/boot/axios";

const API_URL = "profile/";
const API_URL2 = "users/";

const getImages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(API_URL, config);

  return response;
};

const postImage = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(API_URL, data, config);

  return response;
};

const updateImage = async (token, id, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(`${API_URL}${id}`, data, config);

  return response;
};

const delImage = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`${API_URL}${id}`, config);

  return response;
};

const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`${API_URL2}me`, config);

  return response;
};

const updateProfile = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(`${API_URL2}me`, data, config);

  return response;
};

const profileService = {
  getImages,
  postImage,
  updateImage,
  delImage,
  getProfile,
  updateProfile,
};

export default profileService;
