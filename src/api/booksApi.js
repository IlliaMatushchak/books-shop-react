import axiosInstance from "./axiosInstance";

const API_URL = "/api/books";

export const getAllBooksApi = (signal) => {
  return axiosInstance.get(API_URL, { signal });
};

export const getBookByIdApi = (id, signal) => {
  return axiosInstance.get(`${API_URL}/${id}`, { signal });
};

export const createBookApi = (bookData, signal) => {
  return axiosInstance.post(API_URL, bookData, { signal });
};

export const updateBookApi = (id, bookData, signal) => {
  return axiosInstance.put(`${API_URL}/${id}`, bookData, { signal });
};

export const deleteBookApi = (id, signal) => {
  return axiosInstance.delete(`${API_URL}/${id}`, { signal });
};
