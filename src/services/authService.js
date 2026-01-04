import { loginUserApi, registerUserApi, logoutUserApi } from "../api/authApi";

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

  async logout(refreshToken, signal) {
    await logoutUserApi(refreshToken, signal);
  },
};
