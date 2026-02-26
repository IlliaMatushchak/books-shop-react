import axiosInstance from "./axiosInstance";
import { API_URL } from "../constants/api";

export const registerUserApi = (userData, signal) => {
  return axiosInstance.post(API_URL.AUTH.REGISTER, userData, { signal });
};

export const loginUserApi = (credentials, signal) => {
  return axiosInstance.post(API_URL.AUTH.LOGIN, credentials, { signal });
};

export const logoutUserApi = (refreshToken, signal) => {
  return axiosInstance.post(API_URL.AUTH.LOGOUT, { refreshToken }, { signal });
};
