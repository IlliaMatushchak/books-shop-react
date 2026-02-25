import axios from "axios";
import { LocalStorageService, LS_KEYS } from "../utils/storage/localStorage";

// const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";
const API_BASE = process.env.PUBLIC_URL || ""; // for github pages

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = LocalStorageService.getRaw(LS_KEYS.ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let message;
    let originalRequest = error.config;

    if (error?.name === "CanceledError") {
      message = "Request canceled!";
      console.warn("Request canceled!");
    } else if (!error.response) {
      message = "Network error. Please check your connection.";
      console.error("Network/connection error:", error);
    } else if (error.config.url.includes("/auth/login")) {
      message = getErrorMessage(error) || "Login failed";
      console.warn("Login error:", message);
    } else if (error.response?.status === 401) {
      try {
        if (!originalRequest) throw error;
        if (error.config.url.includes("/auth/refresh")) {
          throw new Error("Invalid or expired refresh token");
        }
        if (originalRequest._retry) {
          throw new Error("Retry failed");
        }
        originalRequest._retry = true;

        const accessToken = await getNewAccessToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest); // retry original request
      } catch (error) {
        message =
          error.message || getErrorMessage(error) || "Unauthorized access";
        console.warn(`Unauthorized! ${message}`);
        LocalStorageService.removeAll();
        window.location.replace("/login");
      }
    } else if (error.response?.status >= 500) {
      message = "Server error. Please try again later.";
      console.error("Server error:", error);
    } else {
      message = getErrorMessage(error) || "An error occurred.";
      console.error("Axios error:", error);
    }

    return Promise.reject({
      message,
      status: error.response?.status,
      data: error.response?.data,
      original: error,
    });
  }
);

async function getNewAccessToken() {
  const refreshToken = LocalStorageService.getRaw(LS_KEYS.REFRESH_TOKEN);
  if (!refreshToken) throw new Error("No refresh token");

  const { data } = await axiosInstance.post(`/api/auth/refresh`, {
    refreshToken,
  });
  const { accessToken, refreshToken: newRefreshToken } = data;

  LocalStorageService.set(LS_KEYS.ACCESS_TOKEN, accessToken);
  LocalStorageService.set(LS_KEYS.REFRESH_TOKEN, newRefreshToken);

  return accessToken;
}

function getErrorMessage(error) {
  return (
    error.response?.data?.error ||
    error.response?.data?.message ||
    error.message
  );
}

export default axiosInstance;
