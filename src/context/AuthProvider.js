import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  // logout
  const logout = () => {
    localStorage.clear();
    setUser({});
  };

  const isLoggedIn = () => {
    console.log(token, "token");
    if (token) {
      return true;
    }
  };

  console.log(user, "user");
  console.log(localStorage.getItem("user"), "localStorage");

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
