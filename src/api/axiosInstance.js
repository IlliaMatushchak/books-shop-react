import axios from "axios";
import { LocalStorageService, LS_KEYS } from "../services/localStorage";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: process.env.PUBLIC_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
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

   if (!error.response) {
      message = "Network error. Please check your connection.";
      console.error("Network/connection error:", error);
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
      console.error("Server error:", error.response);
    } else {
      message = getErrorMessage(error) || "An error occurred.";
      console.error("Axios error:", message);
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
