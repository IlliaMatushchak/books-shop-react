import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { LocalStorageService, LS_KEYS } from "../services/localStorage";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => LocalStorageService.get(LS_KEYS.USER));
  const [token, setToken] = useState(() =>
    LocalStorageService.get(LS_KEYS.TOKEN)
  );
  const isLoggedIn = !!token && !!user;

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

  const updateToken = useCallback((token = null) => {
    if (token === null) {
      LocalStorageService.remove(LS_KEYS.TOKEN);
      setToken(null);
    } else {
      setToken(token);
      LocalStorageService.set(LS_KEYS.TOKEN, token);
    }
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
      if (!userData?.token || !userData?.user) {
        console.error("login: invalid userData", userData);
        return;
      }
      const { token, user } = userData;
      updateToken(token);
      updateUser(user);
    },
    [updateToken, updateUser]
  );

  const logout = useCallback(() => {
    updateToken(null);
    updateUser(null);
  }, [updateToken, updateUser]);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoggedIn,
      login,
      logout,
      updateUser,
      updateAvatar,
    }),
    [user, token, isLoggedIn, login, logout, updateUser, updateAvatar]
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
