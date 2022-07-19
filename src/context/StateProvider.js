import { createContext, useState } from "react";
const StateContext = createContext({});

export const StateProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  if (alert) {
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <StateContext.Provider value={{ alert, setAlert }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
