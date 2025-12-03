import {
  getUserCartApi,
  addToCartApi,
  updateCartApi,
  mergeWithRemoteCartApi,
  removeFromCartApi,
  clearCartApi,
} from "../api/cartApi";

export const CartService = {
  async get() {
    const response = await getUserCartApi();
    return response.data;
  },

  async add(productId, quantity = 1) {
    if (quantity <= 0) throw new Error("Quantity must be > 0");
    const response = await addToCartApi(productId, quantity);
    return response.data;
  },

  async update(productId, quantity) {
    if (quantity <= 0) throw new Error("Quantity must be > 0");
    const response = await updateCartApi(productId, quantity);
    return response.data;
  },

  async merge(localCart) {
    const response = await mergeWithRemoteCartApi(localCart);
    return response.data;
  },

  async remove(productId) {
    const response = await removeFromCartApi(productId);
    return response.data;
  },

  async clear() {
    const response = await clearCartApi();
    return response.data;
  },
};
