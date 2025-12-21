import { loginUserApi, registerUserApi } from "../api/authApi";

export const AuthService = {
  async register(userData, signal) {
    const response = await registerUserApi(userData, signal);
    return response.data;
  },

  async login(credentials, signal) {
    const response = await loginUserApi(credentials, signal);
    return response.data;
  },
};
