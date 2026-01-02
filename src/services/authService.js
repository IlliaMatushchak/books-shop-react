import { loginUserApi, registerUserApi, logoutUserApi } from "../api/authApi";
import { LocalStorageService, LS_KEYS } from "./localStorage";

export const AuthService = {
  async register(userData, signal) {
    const response = await registerUserApi(userData, signal);
    return response.data;
  },

  async login(credentials, signal) {
    const response = await loginUserApi(credentials, signal);
    if (!response.data?.token || !response.data?.user) {
      console.error("Login: invalid userData from server", response.data);
      throw new Error("Invalid data from server");
    }
    return response.data;
  },

  async logout(signal) {
    const refreshToken = LocalStorageService.getRaw(LS_KEYS.REFRESH_TOKEN);
    if (refreshToken) await logoutUserApi(refreshToken, signal);
  },
};
