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

  const makeToken = (user) => `fake-jwt.${btoa(`${user.id}:${user.username}`)}`;

  const getUserFromAuth = (config, db) => {
    const auth = config.headers?.Authorization || config.headers?.authorization;
    if (!auth?.startsWith("Bearer ")) return null;

    try {
      const token = auth.replace("Bearer ", "");
      if (!token.startsWith("fake-jwt.")) return null;
      const [, payload] = token.split(".");
      const [, username] = atob(payload).split(":");
      return db.users.find((u) => u.username === username) || null;
    } catch {
      return null;
    }
  };

  const requireAuth = (config, db) => {
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];
    return user;
  };

  const requireAdmin = (user) => {
    if (user.role !== "ADMIN") {
      return [403, { message: "Forbidden" }];
    }
    return null;
  };

  // ==================== AUTH ====================

  mock.onPost("/api/auth/register").reply((config) => {
    const db = loadDb();
    const body = JSON.parse(config.data || "{}");

    if (!body.username || !body.password) {
      return [400, { message: "Username and password are required" }];
    }

    const exists = db.users.find(
      (u) => u.username === body.username || u.email === body.email
    );
    if (exists) return [400, { message: "User already exists" }];

    const newUser = {
      id: db.nextUserId++,
      username: body.username,
      password: body.password,
      email: body.email,
      phoneNumber: body.phoneNumber || "",
      gender: body.gender || "UNSPECIFIED",
      role: "USER",
      avatar: null,
      cart: [],
    };

    db.users.push(newUser);
    saveDb(db);

    return [
      201,
      {
        message: "User registered successfully",
        user: { ...newUser, password: undefined },
      },
    ];
  });

  mock.onPost("/api/auth/login").reply((config) => {
    const db = loadDb();
    const body = JSON.parse(config.data || "{}");

    const user = db.users.find(
      (u) => u.username === body.username && u.password === body.password
    );

    if (!user) return [401, { message: "Invalid credentials" }];

    return [
      200,
      {
        token: makeToken(user),
        user: { ...user, password: undefined },
      },
    ];
  });

  // ==================== BOOKS ====================

  mock.onGet("/api/books").reply(() => {
    const db = loadDb();
    return [200, db.books];
  });

  mock.onGet(/\/api\/books\/\d+/).reply((config) => {
    const db = loadDb();
    const id = Number(config.url.split("/").pop());
    const book = db.books.find((b) => b.id === id);
    if (!book) return [404, { message: "Not found" }];
    return [200, book];
  });

  mock.onPost("/api/books").reply((config) => {
    const db = loadDb();
    const user = requireAuth(config, db);
    if (Array.isArray(user)) return user;

    const forbidden = requireAdmin(user);
    if (forbidden) return forbidden;

    const body = JSON.parse(config.data || "{}");
    const newBook = { id: db.nextBookId++, ...body };
    db.books.push(newBook);
    saveDb(db);
    return [201, newBook];
  });

  mock.onPut(/\/api\/books\/\d+/).reply((config) => {
    const db = loadDb();
    const user = requireAuth(config, db);
    if (Array.isArray(user)) return user;

    const forbidden = requireAdmin(user);
    if (forbidden) return forbidden;

    const id = Number(config.url.split("/").pop());
    const body = JSON.parse(config.data || "{}");

    const idx = db.books.findIndex((b) => b.id === id);
    if (idx === -1) return [404, { message: "Not found" }];

    db.books[idx] = { ...db.books[idx], ...body };
    saveDb(db);
    return [200, db.books[idx]];
  });

  mock.onDelete(/\/api\/books\/\d+/).reply((config) => {
    const db = loadDb();
    const user = requireAuth(config, db);
    if (Array.isArray(user)) return user;

    const forbidden = requireAdmin(user);
    if (forbidden) return forbidden;

    const id = Number(config.url.split("/").pop());
    const idx = db.books.findIndex((b) => b.id === id);
    if (idx === -1) return [404, { message: "Not found" }];

    const removed = db.books.splice(idx, 1)[0];
    saveDb(db);
    return [200, removed];
  });
}
