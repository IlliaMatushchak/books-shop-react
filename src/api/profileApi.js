import axiosInstance from "./axiosInstance";

const API_URL = "/profile";

export const getUserProfileApi = (signal) => {
  return axiosInstance.get(API_URL, { signal });
};

export const updateUserProfileApi = (userData, signal) => {
  return axiosInstance.put(API_URL, userData, { signal });
};

export const changeUserPasswordApi = (passwordData, signal) => {
  return axiosInstance.put(API_URL + "/password", passwordData, { signal });
};

export const updateUserAvatarApi = (avatar, signal) => {
  return axiosInstance.put(API_URL + "/avatar", { avatar }, { signal });
};

export const deleteUserAvatarApi = (signal) => {
  return axiosInstance.delete(API_URL + "/avatar", { signal });
};
