import { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = useMemo(
    () => ({
      userName,
      setUserName,
      isLoggedIn,
      setIsLoggedIn,
    }),
    [userName, isLoggedIn]
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
