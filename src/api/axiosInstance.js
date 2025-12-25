import axios from "axios";
import { LocalStorageService, LS_KEYS } from "../services/localStorage";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: process.env.PUBLIC_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = LocalStorageService.getRaw(LS_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message;

    if (!error.response) {
      message = "Network error. Please check your connection.";
      console.error("Network/connection error:", error);
    } else if (error.response?.status === 401) {
      message = getErrorMessage(error) || "Unauthorized access.";
      console.warn("Unauthorized! Maybe token expired.");
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

function getErrorMessage(error) {
  return (
    error.response?.data?.error ||
    error.response?.data?.message ||
    error.message
  );
}

export default axiosInstance;
