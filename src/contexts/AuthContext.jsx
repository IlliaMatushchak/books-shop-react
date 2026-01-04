import { createContext, useContext, useMemo, useCallback } from "react";
import useControlledFetch from "../hooks/useControlledFetch";
import { AuthService } from "../services/authService";
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
  const {
    data: user,
    setData: setUser,
    loading,
    error,
    fetch: AuthFetch,
  } = useControlledFetch({
    initialData: LocalStorageService.get(LS_KEYS.USER) || null,
  });
  const isLoggedIn = !!user;

  const updateUser = useCallback(
    (newUser = null) => {
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
    },
    [setUser]
  );

  const updateAvatar = useCallback(
    (newAvatar) => {
      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        const updatedUser = { ...prevUser, avatar: newAvatar };
        LocalStorageService.set(LS_KEYS.USER, updatedUser);
        return updatedUser;
      });
    },
    [setUser]
  );

  const login = useCallback(
    (formData) => {
      AuthFetch({
        requestFn: AuthService.login,
        args: [formData],
        onSuccess: ({ token, user }) => {
          updateToken(token);
          updateUser(user);
        },
      });
    },
    [updateUser, AuthFetch]
  );

  const logout = useCallback(() => {
    const refreshToken = LocalStorageService.getRaw(LS_KEYS.REFRESH_TOKEN);
    if (refreshToken) {
      AuthFetch({
        requestFn: AuthService.logout,
        args: [refreshToken],
      });
    }
    updateToken(null);
    updateUser(null);
  }, [updateUser, AuthFetch]);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn,
      loading,
      error,
      login,
      logout,
      updateUser,
      updateAvatar,
    }),
    [user, isLoggedIn, loading, error, login, logout, updateUser, updateAvatar]
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
