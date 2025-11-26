import axiosInstance from "./axiosInstance";

const API_URL = "/cart";

export const getUserCartApi = () => {
  return axiosInstance.get(API_URL);
};

export const addToCartApi = (productId, quantity = 1) => {
  return axiosInstance.post(API_URL, { productId, quantity });
};

export const updateCartApi = (productId, quantity) => {
  return axiosInstance.put(`${API_URL}/${productId}`, { quantity });
};

export const removeFromCartApi = (productId) => {
  return axiosInstance.delete(`${API_URL}/${productId}`);
};

export const clearCartApi = () => {
  return axiosInstance.delete(API_URL);
};
