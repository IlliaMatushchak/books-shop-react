import {
  getUserProfileApi,
  updateUserProfileApi,
  changeUserPasswordApi,
  updateUserAvatarApi,
  deleteUserAvatarApi,
} from "../api/profileApi";

export const ProfileService = {
  async getProfile(signal) {
    const response = await getUserProfileApi(signal);
    return response.data;
  },

  async updateProfile(userData, signal) {
    const response = await updateUserProfileApi(userData, signal);
    return response.data;
  },

  async changePassword(passwordData, signal) {
    const response = await changeUserPasswordApi(passwordData, signal);
    return response.data;
  },

  async updateAvatar(avatar, signal) {
    const response = await updateUserAvatarApi(avatar, signal);
    return response.data;
  },

  async deleteAvatar(signal) {
    const response = await deleteUserAvatarApi(signal);
    return response.data;
  },
};
