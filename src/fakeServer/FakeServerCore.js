import axiosInstance from "../api/axiosInstance";
import AxiosMockAdapter from "axios-mock-adapter";
import books from "../data/books.json";
import users from "../data/users.json";

export function installFakeServerAxios() {
  if (window.__FAKE_AXIOS_SERVER__) return;
  window.__FAKE_AXIOS_SERVER__ = true;

  console.log("%c✅ FakeServerAxios installed", "color: green;");

  const mock = new AxiosMockAdapter(axiosInstance, { delayResponse: 800 });
  const LS_KEY = "__fake_bookstore_db";

  const SEED = {
    books: books.books,
    users: users.users,
    nextUserId: users.users.length + 1,
    nextBookId: books.books.length + 1,
  };

  const createDb = () => {
    if (!localStorage.getItem(LS_KEY)) {
      localStorage.setItem(LS_KEY, JSON.stringify(SEED));
    }
  };

  const loadDb = () => {
    const data = localStorage.getItem(LS_KEY);
    if (!data) {
      createDb();
      return JSON.parse(JSON.stringify(SEED)); // structuredClone(SEED)
    }
    return JSON.parse(data);
  };

  const saveDb = (db) => {
    localStorage.setItem(LS_KEY, JSON.stringify(db));
  };

  createDb();
}
