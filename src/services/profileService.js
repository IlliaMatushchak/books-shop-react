import {
  getUserProfileApi,
  updateUserProfileApi,
  changeUserPasswordApi,
  updateUserAvatarApi,
  deleteUserAvatarApi,
} from "../api/profileApi";

export const ProfileService = {
  async getProfile() {
    const response = await getUserProfileApi();

    return response.data;
  },

  async updateProfile(userData) {
    const response = await updateUserProfileApi(userData);

    return response.data;
  },

  async changePassword(passwordData) {
    const response = await changeUserPasswordApi(passwordData);

    return response.data;
  },

  async updateAvatar(avatar) {
    const response = await updateUserAvatarApi(avatar);

    return response.data;
  },

  async deleteAvatar() {
    const response = await deleteUserAvatarApi();

    return response.data;
  },
};
