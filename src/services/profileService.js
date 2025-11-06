import { getUserProfileApi, updateUserProfileApi } from "../api/profileApi";
import { LocalStorageService, LS_KEYS } from "./localStorage";

export const ProfileService = {
  async getProfile() {
    const response = await getUserProfileApi();

    return response.data;
  },

  async updateProfile(userData) {
    const response = await updateUserProfileApi(userData);
    const updatedUser = response.data;
    LocalStorageService.set(LS_KEYS.USER, updatedUser);

    return updatedUser;
  },
};
