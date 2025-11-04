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
    setUser(data.user);
    setToken(data.token);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoggedIn: isAuthenticated,
      login,
      logout,
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
