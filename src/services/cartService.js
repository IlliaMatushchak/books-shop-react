import {
  getUserCartApi,
  addToCartApi,
  updateCartApi,
  mergeWithRemoteCartApi,
  removeFromCartApi,
  clearCartApi,
} from "../api/cartApi";

export const CartService = {
  async get(signal) {
    const response = await getUserCartApi(signal);
    return response.data;
  },

  async add(productId, quantity = 1, signal) {
    if (quantity <= 0) throw new Error("Quantity must be > 0");
    const response = await addToCartApi(productId, quantity, signal);
    return response.data;
  },

  async update(productId, quantity, signal) {
    if (quantity <= 0) throw new Error("Quantity must be > 0");
    const response = await updateCartApi(productId, quantity, signal);
    return response.data;
  },

  async merge(localCart, signal) {
    const response = await mergeWithRemoteCartApi(localCart, signal);
    return response.data;
  },

  async remove(productId, signal) {
    const response = await removeFromCartApi(productId, signal);
    return response.data;
  },

  async clear(signal) {
    const response = await clearCartApi(signal);
    return response.data;
  },
};
