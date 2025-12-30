import axiosInstance from "../api/axiosInstance";
import AxiosMockAdapter from "axios-mock-adapter";
import books from "../data/books.json";
import users from "../data/users.json";

const API = {
  AUTH: "/api/auth",
  BOOKS: "/api/books",
  PROFILE: "/api/profile",
  CART: "/api/cart",
};

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

  const ACCESS_TTL = 15 * 60 * 1000; // 15min
  const REFRESH_TTL = 7 * 24 * 60 * 60 * 1000; // 7days

  const makeAccessToken = (user) =>
    `access.${btoa(`${user.id}:${Date.now() + ACCESS_TTL}`)}`;

  const makeRefreshToken = () => `refresh.${crypto.randomUUID()}`;

  const getUserFromAuth = (config, db) => {
    const auth = config.headers?.Authorization || config.headers?.authorization;
    if (!auth?.startsWith("Bearer ")) return null;

    try {
      const token = auth.replace("Bearer ", "");
      if (!token.startsWith("access.")) return null;
      const [, payload] = token.split(".");
      const [id, expiresAt] = atob(payload).split(":");
      if (Date.now() > Number(expiresAt)) return null;
      return db.users.find((u) => u.id === Number(id)) || null;
    } catch {
      return null;
    }
  };

  const buildFullCart = (user, db) =>
    user.cart
      .map((item) => {
        const book = db.books.find((b) => b.id === item.productId);
        if (!book) return null;
        return { ...item, book: { ...book } };
      })
      .filter((item) => !!item);

  // ==================== AUTH ====================

  mock.onPost(API.AUTH + "/register").reply((config) => {
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

  mock.onPost(API.AUTH + "/login").reply((config) => {
    const db = loadDb();
    const body = JSON.parse(config.data || "{}");

    const user = db.users.find(
      (u) => u.username === body.username && u.password === body.password
    );

    if (!user) return [401, { message: "Invalid credentials" }];

    const accessToken = makeAccessToken(user);
    const refreshToken = makeRefreshToken();
    user.refreshToken = refreshToken;
    user.refreshTokenExpiresAt = Date.now() + REFRESH_TTL;

    saveDb(db);

    return [
      200,
      {
        token: { accessToken, refreshToken },
        user: {
          ...user,
          password: undefined,
          refreshToken: undefined,
          refreshTokenExpiresAt: undefined,
        },
      },
    ];
  });

  mock.onPost(API.AUTH + "/logout").reply((config) => {
    const db = loadDb();
    const { refreshToken } = JSON.parse(config.data || "{}");

    const user = db.users.find((u) => u.refreshToken === refreshToken);
    if (user) {
      user.refreshToken = null;
      user.refreshTokenExpiresAt = null;
      saveDb(db);
    }

    return [204];
  });

  mock.onPost(API.AUTH + "/refresh").reply((config) => {
    const db = loadDb();
    const { refreshToken } = JSON.parse(config.data || "{}");

    const user = db.users.find(
      (u) =>
        u.refreshToken === refreshToken && u.refreshTokenExpiresAt > Date.now()
    );

    if (!user) return [401, { message: "Invalid refresh token" }];

    const newAccessToken = makeAccessToken(user);
    const newRefreshToken = makeRefreshToken();

    user.refreshToken = newRefreshToken;
    user.refreshTokenExpiresAt = Date.now() + REFRESH_TTL;
    saveDb(db);

    return [
      200,
      {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    ];
  });

  // ==================== BOOKS ====================

  mock.onGet(API.BOOKS).reply(() => {
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

  mock.onPost(API.BOOKS).reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    if (user.role !== "ADMIN") {
      return [403, { message: "Forbidden" }];
    }

    const body = JSON.parse(config.data || "{}");

    if (!body.title || !body.price) {
      return [400, { message: "Invalid book data" }];
    }

    const newBook = { id: db.nextBookId++, ...body };
    db.books.push(newBook);
    saveDb(db);
    return [201, newBook];
  });

  mock.onPut(/\/api\/books\/\d+/).reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    if (user.role !== "ADMIN") {
      return [403, { message: "Forbidden" }];
    }

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
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    if (user.role !== "ADMIN") {
      return [403, { message: "Forbidden" }];
    }

    const id = Number(config.url.split("/").pop());
    const idx = db.books.findIndex((b) => b.id === id);
    if (idx === -1) return [404, { message: "Not found" }];

    db.users.forEach((u) => {
      u.cart = u.cart.filter((i) => i.productId !== id);
    });

    const removed = db.books.splice(idx, 1)[0];
    saveDb(db);
    return [200, removed];
  });

  // ==================== PROFILE ====================

  mock.onGet(API.PROFILE).reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    return [200, { ...user, password: undefined }];
  });

  mock.onPut(API.PROFILE).reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    const updates = JSON.parse(config.data || "{}");

    ["id", "username", "role", "password", "cart", "avatar"].forEach(
      (k) => delete updates[k]
    );

    const idx = db.users.findIndex((u) => u.id === user.id);
    if (idx === -1) return [404, { message: "User not found" }];
    db.users[idx] = { ...db.users[idx], ...updates };
    saveDb(db);

    return [200, { ...db.users[idx], password: undefined }];
  });

  mock.onPut(API.PROFILE + "/password").reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    const { oldPassword, newPassword } = JSON.parse(config.data || "{}");

    if (!oldPassword || !newPassword) {
      return [400, { message: "All fields must be filled in" }];
    }

    if (user.password !== oldPassword) {
      return [400, { message: "Old password is incorrect" }];
    }

    user.password = newPassword;
    saveDb(db);

    return [200, { message: "Password changed successfully" }];
  });

  mock.onPut(API.PROFILE + "/avatar").reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    const { avatar } = JSON.parse(config.data || "{}");
    if (!avatar) return [400, { message: "Avatar is required" }];

    user.avatar = avatar;
    saveDb(db);

    return [200, { avatar }];
  });

  mock.onDelete(API.PROFILE + "/avatar").reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    user.avatar = null;
    saveDb(db);

    return [200, { ...user, password: undefined }];
  });

  // ==================== CART ====================

  mock.onGet(API.CART).reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    return [200, buildFullCart(user, db)];
  });

  mock.onPost(API.CART).reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    const { productId, quantity = 1 } = JSON.parse(config.data || "{}");
    if (quantity <= 0) {
      return [400, { message: "Quantity must be positive" }];
    }

    const book = db.books.find((b) => b.id === productId);
    if (!book) return [404, { message: "Book not found" }];

    const idx = user.cart.findIndex((c) => c.productId === productId);

    if (idx === -1) {
      if (quantity > book.amount) {
        return [409, { message: `Only ${book.amount} left in stock` }];
      }
      user.cart.push({ productId, quantity });
    } else {
      const nextQty = user.cart[idx].quantity + quantity;
      if (nextQty > book.amount) {
        return [409, { message: `Only ${book.amount} left in stock` }];
      }
      user.cart[idx].quantity = nextQty;
    }

    saveDb(db);
    return [200, buildFullCart(user, db)];
  });

  mock.onPut(/\/api\/cart\/\d+/).reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    const productId = Number(config.url.split("/").pop());
    const { quantity } = JSON.parse(config.data || "{}");

    const book = db.books.find((b) => b.id === productId);
    if (!book) return [404, { message: "Book not found" }];

    const idx = user.cart.findIndex((c) => c.productId === productId);
    if (idx === -1) return [404, { message: "Item not found" }];

    if (quantity <= 0) {
      user.cart.splice(idx, 1);
    } else if (quantity > book.amount) {
      return [409, { message: `Only ${book.amount} left in stock` }];
    } else {
      user.cart[idx].quantity = quantity;
    }

    saveDb(db);
    return [200, buildFullCart(user, db)];
  });

  mock.onDelete(/\/api\/cart\/\d+/).reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    const productId = Number(config.url.split("/").pop());
    user.cart = user.cart.filter((i) => i.productId !== productId);

    saveDb(db);
    return [200, buildFullCart(user, db)];
  });

  mock.onDelete(API.CART).reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    user.cart = [];
    saveDb(db);

    return [200, []];
  });

  mock.onPost(API.CART + "/merge").reply((config) => {
    const db = loadDb();
    const user = getUserFromAuth(config, db);
    if (!user) return [401, { message: "Unauthorized" }];

    const { localCart = [] } = JSON.parse(config.data || "{}");

    localCart.forEach(({ productId, quantity }) => {
      const book = db.books.find((b) => b.id === productId);
      if (!book || quantity <= 0) return;

      const qty = Math.min(quantity, book.amount);
      const found = user.cart.find((x) => x.productId === productId);

      if (found) found.quantity = qty;
      else user.cart.push({ productId, quantity: qty });
    });

    saveDb(db);
    return [200, buildFullCart(user, db)];
  });
}
