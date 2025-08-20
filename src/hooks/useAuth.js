import { createContext, useContext } from "react";

const AuthContext = createContext(null);

// const AuthProvider = AuthContext.Provider;

const useAuth = () => useContext(AuthContext);

export {AuthContext, useAuth};