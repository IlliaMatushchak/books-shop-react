import axiosInstance from "./axiosInstance";

const API_URL = "/profile";

export const getUserProfileApi = () => {
  return axiosInstance.get(API_URL);
};

export const updateUserProfileApi = (userData) => {
  return axiosInstance.put(API_URL, userData);
};
