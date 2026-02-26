import axiosInstance from "./axiosInstance";
import { API_URL } from "../constants/api";

export const getAllBooksApi = (signal) => {
  return axiosInstance.get(API_URL.PRODUCTS, { signal });
};

export const getBookByIdApi = (id, signal) => {
  return axiosInstance.get(`${API_URL.PRODUCTS}/${id}`, { signal });
};

export const createBookApi = (bookData, signal) => {
  return axiosInstance.post(API_URL.PRODUCTS, bookData, { signal });
};

export const updateBookApi = (id, bookData, signal) => {
  return axiosInstance.put(`${API_URL.PRODUCTS}/${id}`, bookData, { signal });
};

export const deleteBookApi = (id, signal) => {
  return axiosInstance.delete(`${API_URL.PRODUCTS}/${id}`, { signal });
};
