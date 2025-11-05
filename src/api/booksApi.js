import axiosInstance from "./axiosInstance";

const API_URL = "/books";

export const getAllBooksApi = () => {
  return axiosInstance.get(API_URL);
};

export const getBookByIdApi = (id) => {
  return axiosInstance.get(`${API_URL}/${id}`);
};

export const createBookApi = (bookData) => {
  return axiosInstance.post(API_URL, bookData);
};

export const updateBookApi = (id, bookData) => {
  return axiosInstance.put(`${API_URL}/${id}`, bookData);
};

export const deleteBookApi = (id) => {
  return axiosInstance.delete(`${API_URL}/${id}`);
};
