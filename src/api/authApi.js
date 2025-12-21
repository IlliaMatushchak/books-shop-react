import axiosInstance from "./axiosInstance";

const API_URL = "/auth";

export const registerUserApi = (userData, signal) => {
  return axiosInstance.post(API_URL + "/register", userData, { signal });
};

export const loginUserApi = (credentials, signal) => {
  return axiosInstance.post(API_URL + "/login", credentials, { signal });
};
