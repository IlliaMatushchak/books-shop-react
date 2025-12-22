import axiosInstance from "./axiosInstance";

const API_URL = "/api/cart";

export const getUserCartApi = (signal) => {
  return axiosInstance.get(API_URL, { signal });
};

export const addToCartApi = (productId, quantity = 1, signal) => {
  return axiosInstance.post(API_URL, { productId, quantity }, { signal });
};

export const updateCartApi = (productId, quantity, signal) => {
  return axiosInstance.put(`${API_URL}/${productId}`, { quantity }, { signal });
};

export const mergeWithRemoteCartApi = (localCart, signal) => {
  return axiosInstance.post(`${API_URL}/merge`, { localCart }, { signal });
};

export const removeFromCartApi = (productId, signal) => {
  return axiosInstance.delete(`${API_URL}/${productId}`, { signal });
};

export const clearCartApi = (signal) => {
  return axiosInstance.delete(API_URL, { signal });
};
