import { createContext, useEffect, useState } from "react";
import { getFavorite, getListings } from "../api/API";
import useAuth from "../hooks/useAuth";
const StateContext = createContext({});

export const StateProvider = ({ children }) => {
  // user ID
  const { userId } = useAuth();
  // alert
  const [alert, setAlert] = useState(null);
  if (alert) {
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  // listings
  const [listings, setListings] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchListings = async () => {
    try {
      const response = await getListings();
      setListings(response);
      console.log(response);
    } catch (error) {}
  };
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await getFavorite(userId);
      setFavorites(response);
      console.log(response);
    } catch (error) {}
  };
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Filters states
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // preview
  const [preview, setPreview] = useState({});
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
        preview,
        setPreview,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
