import { useState, useMemo } from "react";
import { AuthContext } from "../../hooks/useAuth";

const AuthProvider = ({ children }) => {
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
};

export default AuthProvider;
