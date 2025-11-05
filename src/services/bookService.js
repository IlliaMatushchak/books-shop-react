import {
  getAllBooksApi,
  getBookByIdApi,
  createBookApi,
  updateBookApi,
  deleteBookApi,
} from "../api/booksApi";

export const BookService = {
  async getAll() {
    const response = await getAllBooksApi();
    return response.data;
  },

  async getById(id) {
    const response = await getBookByIdApi(id);
    return response.data;
  },

  async create(product) {
    const response = await createBookApi(product);
    return response.data;
  },

  async update(id, product) {
    const response = await updateBookApi(id, product);
    return response.data;
  },

  async delete(id) {
    const response = await deleteBookApi(id);
    return response.data;
  },
};
