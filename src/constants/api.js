// const BASE_URL = process.env.REACT_APP_API_BASE || "http://localhost:8080";
export const BASE_URL = process.env.PUBLIC_URL || ""; // for github pages
export const API_PREFIX = "/api";

export const BASE_ENDPOINTS = {
  AUTH: "/auth",
  PRODUCTS: "/books",
  CART: "/cart",
  PROFILE: "/profile",
};

export const AUTH_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
  REFRESH: "/refresh",
};

export const PROFILE_ENDPOINTS = {
  PASSWORD: "/password",
  AVATAR: "/avatar",
};

export const CART_ENDPOINTS = {
  MERGE: "/merge",
};

export const API_URL = {
  AUTH: {
    LOGIN: `${API_PREFIX}${BASE_ENDPOINTS.AUTH}${AUTH_ENDPOINTS.LOGIN}`,
    REGISTER: `${API_PREFIX}${BASE_ENDPOINTS.AUTH}${AUTH_ENDPOINTS.REGISTER}`,
    LOGOUT: `${API_PREFIX}${BASE_ENDPOINTS.AUTH}${AUTH_ENDPOINTS.LOGOUT}`,
    REFRESH: `${API_PREFIX}${BASE_ENDPOINTS.AUTH}${AUTH_ENDPOINTS.REFRESH}`,
  },

  PRODUCTS: `${API_PREFIX}${BASE_ENDPOINTS.PRODUCTS}`,

  CART: {
    ROOT: `${API_PREFIX}${BASE_ENDPOINTS.CART}`,
    MERGE: `${API_PREFIX}${BASE_ENDPOINTS.CART}${CART_ENDPOINTS.MERGE}`,
  },

  PROFILE: {
    ROOT: `${API_PREFIX}${BASE_ENDPOINTS.PROFILE}`,
    PASSWORD: `${API_PREFIX}${BASE_ENDPOINTS.PROFILE}${PROFILE_ENDPOINTS.PASSWORD}`,
    AVATAR: `${API_PREFIX}${BASE_ENDPOINTS.PROFILE}${PROFILE_ENDPOINTS.AVATAR}`,
  },
};
