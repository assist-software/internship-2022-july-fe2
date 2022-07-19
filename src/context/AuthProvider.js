import { createContext, useEffect, useState } from "react";
import { getUserById } from "../api/API";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // user
  const [user, setUser] = useState(null);

  //  set user from local storage if exists
  // id should change with token in production
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  console.log(userId, "----id");
  const fetchUser = async () => {
    try {
      const response = await getUserById(userId);
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  // logout function
  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  // login function
  const login = (user) => {
    localStorage.setItem("token", user.token);
    setUser(user);
  };

  // check if user is logged in
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoggedIn, user, fetchUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
