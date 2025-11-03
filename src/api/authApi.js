import axiosInstance from "./axiosInstance";

const API_URL = "/auth";

export const registerUserApi = (userData) => {
  return axiosInstance.post(API_URL + "/register", userData);
};

export const loginUserApi = (credentials) => {
  return axiosInstance.post(API_URL + "/login", credentials);
};
