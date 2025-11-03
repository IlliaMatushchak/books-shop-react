import { loginUserApi, registerUserApi } from "../api/authApi";
import { LocalStorageService, LS_KEYS } from "./localStorage";

export const AuthService = {
  async register(userData) {
    const response = await registerUserApi(userData);
    return response.data;
  },

  async login(credentials) {
    const response = await loginUserApi(credentials);

    const { token, user } = response.data;
    LocalStorageService.set(LS_KEYS.TOKEN, token);
    LocalStorageService.set(LS_KEYS.USER, user);

    return response.data;
  },

  logout() {
    LocalStorageService.remove(LS_KEYS.TOKEN);
    LocalStorageService.remove(LS_KEYS.USER);
  },
};
