import { createContext, useEffect, useState } from "react";
import { getListings } from "../api/API";
const StateContext = createContext({});

export const StateProvider = ({ children }) => {
  // alert
  const [alert, setAlert] = useState(null);
  if (alert) {
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  // listings
  const [listings, setListings] = useState(null);

  const fetchListings = async () => {
    try {
      const response = await getListings();
      setListings(response);
    } catch (error) {}
  };
  useEffect(() => {
    fetchListings();
  }, []);

  // Filters states
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  return (
    <StateContext.Provider
      value={{
        listings,
        setListings,
        alert,
        setAlert,
        sortOrder,
        setSortOrder,
        priceRange,
        setPriceRange,
        locationFilter,
        setLocationFilter,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
