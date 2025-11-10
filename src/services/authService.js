import { loginUserApi, registerUserApi } from "../api/authApi";

export const AuthService = {
  async register(userData) {
    const response = await registerUserApi(userData);

    return response.data;
  },

  async login(credentials) {
    const response = await loginUserApi(credentials);

    return response.data;
  },
};
