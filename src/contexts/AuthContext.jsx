import { createContext, useContext, useState, useMemo } from "react";
import { AuthService } from "../services/authService";
import { LocalStorageService, LS_KEYS } from "../services/localStorage";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(LocalStorageService.get(LS_KEYS.USER));
  const [token, setToken] = useState(LocalStorageService.get(LS_KEYS.TOKEN));
  const isAuthenticated = !!token;

  const login = async (credentials) => {
    const data = await AuthService.login(credentials);
    const {
      token,
      user: { id, username, role, avatar },
    } = data;
    LocalStorageService.set(LS_KEYS.TOKEN, token);
    LocalStorageService.set(LS_KEYS.USER, { id, username, role, avatar });
    setUser({ id, username, role, avatar });
    setToken(token);
  };

  const logout = () => {
    LocalStorageService.remove(LS_KEYS.TOKEN);
    LocalStorageService.remove(LS_KEYS.USER);
    setUser(null);
    setToken(null);
  };

  const updateUser = (newProfile) => {
    const { id, username, role, avatar } = newProfile;
    setUser({ id, username, role, avatar });
    LocalStorageService.set(LS_KEYS.USER, { id, username, role, avatar });
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      isLoggedIn: isAuthenticated,
      login,
      logout,
      updateUser,
    }),
    [user, token, isAuthenticated]
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
