import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { LocalStorageService, LS_KEYS } from "../services/localStorage";

const AuthContext = createContext(null);

const updateToken = (token = null) => {
  if (token === null) {
    LocalStorageService.remove(LS_KEYS.ACCESS_TOKEN);
    LocalStorageService.remove(LS_KEYS.REFRESH_TOKEN);
  } else {
    LocalStorageService.set(LS_KEYS.ACCESS_TOKEN, token.accessToken);
    LocalStorageService.set(LS_KEYS.REFRESH_TOKEN, token.refreshToken);
  }
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => LocalStorageService.get(LS_KEYS.USER));
  const isLoggedIn = !!user;

  const updateUser = useCallback((newUser = null) => {
    if (newUser === null) {
      LocalStorageService.remove(LS_KEYS.USER);
      setUser(null);
      return;
    }
    if (typeof newUser === "object") {
      const { id, username, role, avatar } = newUser;
      setUser({ id, username, role, avatar });
      LocalStorageService.set(LS_KEYS.USER, { id, username, role, avatar });
      return;
    }
    console.error("updateUser: invalid argument", newUser);
  }, []);

  const updateAvatar = useCallback((newAvatar) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const updatedUser = { ...prevUser, avatar: newAvatar };
      LocalStorageService.set(LS_KEYS.USER, updatedUser);
      return updatedUser;
    });
  }, []);

  const login = useCallback(
    (userData) => {
      const { token, user } = userData;
      updateToken(token);
      updateUser(user);
    },
    [updateUser]
  );

  const logout = useCallback(() => {
    updateToken(null);
    updateUser(null);
  }, [updateUser]);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn,
      login,
      logout,
      updateUser,
      updateAvatar,
    }),
    [user, isLoggedIn, login, logout, updateUser, updateAvatar]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
