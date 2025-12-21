import {
  getAllBooksApi,
  getBookByIdApi,
  createBookApi,
  updateBookApi,
  deleteBookApi,
} from "../api/booksApi";

export const BookService = {
  async getAll(signal) {
    const response = await getAllBooksApi(signal);
    return response.data;
  },

  async getById(id, signal) {
    const response = await getBookByIdApi(id, signal);
    return response.data;
  },

  async create(product, signal) {
    const response = await createBookApi(product, signal);
    return response.data;
  },

  async update(id, product, signal) {
    const response = await updateBookApi(id, product, signal);
    return response.data;
  },

  async delete(id, signal) {
    const response = await deleteBookApi(id, signal);
    return response.data;
  },
};
