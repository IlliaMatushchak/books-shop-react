import axiosInstance from "./axiosInstance";

const API_URL = "/profile";

export const getUserProfileApi = () => {
  return axiosInstance.get(API_URL);
};

export const updateUserProfileApi = (userData) => {
  return axiosInstance.put(API_URL, userData);
};

export const changeUserPasswordApi = (passwordData) => {
  return axiosInstance.put(API_URL + "/password", passwordData);
};

export const updateUserAvatarApi = (avatar) => {
  return axiosInstance.put(API_URL + "/avatar", { avatar });
};

export const deleteUserAvatarApi = () => {
  return axiosInstance.delete(API_URL + "/avatar");
};
