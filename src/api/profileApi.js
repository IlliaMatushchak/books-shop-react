import axiosInstance from "./axiosInstance";
import { API_URL } from "../constants/api";

export const getUserProfileApi = (signal) => {
  return axiosInstance.get(API_URL.PROFILE.ROOT, { signal });
};

export const updateUserProfileApi = (userData, signal) => {
  return axiosInstance.put(API_URL.PROFILE.ROOT, userData, { signal });
};

export const changeUserPasswordApi = (passwordData, signal) => {
  return axiosInstance.put(API_URL.PROFILE.PASSWORD, passwordData, { signal });
};

export const updateUserAvatarApi = (avatar, signal) => {
  return axiosInstance.put(API_URL.PROFILE.AVATAR, { avatar }, { signal });
};

export const deleteUserAvatarApi = (signal) => {
  return axiosInstance.delete(API_URL.PROFILE.AVATAR, { signal });
};
