import axiosInstance from "./axiosInstance";
import { API_URL } from "../constants/api";

export const getUserCartApi = (signal) => {
  return axiosInstance.get(API_URL.CART.ROOT, { signal });
};

export const addToCartApi = (productId, quantity = 1, signal) => {
  return axiosInstance.post(API_URL.CART.ROOT, { productId, quantity }, { signal });
};

export const updateCartApi = (productId, quantity, signal) => {
  return axiosInstance.put(`${API_URL.CART.ROOT}/${productId}`, { quantity }, { signal });
};

export const mergeWithRemoteCartApi = (localCart, signal) => {
  return axiosInstance.post(API_URL.CART.MERGE, { localCart }, { signal });
};

export const removeFromCartApi = (productId, signal) => {
  return axiosInstance.delete(`${API_URL.CART.ROOT}/${productId}`, { signal });
};

export const clearCartApi = (signal) => {
  return axiosInstance.delete(API_URL.CART.ROOT, { signal });
};
