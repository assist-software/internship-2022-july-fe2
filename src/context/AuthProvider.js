import { createContext, useEffect, useState } from "react";
import { getUserById } from "../api/API";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // user
  const [user, setUser] = useState(null);

  //  set user from local storage if exists
  // id should change with token in production

  useEffect(() => {
    const userId = localStorage.getItem("user");
    (async () => {
      try {
        const response = await getUserById(userId);
        setUser(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, []);

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
    <AuthContext.Provider value={{ login, logout, isLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
