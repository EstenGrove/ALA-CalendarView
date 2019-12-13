import React, { useState, createContext } from "react";

export const initialAuthState = {
  username: null,
  password: null,
  token: null,
  sessionID: null,
  isAuthenticated: false,
  isAdmin: false
};

export const AuthContext = createContext(initialAuthState);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(initialAuthState);
  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
