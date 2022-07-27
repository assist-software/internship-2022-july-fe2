import { createContext, useCallback, useEffect, useState } from "react";
import { getListings, getMessageByUserId, getFavorite } from "../api/API";
import useAuth from "../hooks/useAuth";

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
  // show grid show list
  const [listView, setListView] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchListings = async () => {
    try {
      const response = await getListings();
      setListings(response);
      console.log(response);
    } catch (error) {}
  };
  // messages
  const [messages, setMessages] = useState([]);
  const [privateConversation, setPrivateConversation] = useState([]);
  const { userId, user } = useAuth();

  // const fetchMessages = async () => {
  //   try {
  //     const response = await getMessageByUserId(userId);
  //     if (response.status === 200) {
  //       setMessages(response.data);
  //     }
  //   } catch (error) {}
  // };

  useEffect(() => {
    fetchListings();
    console.log("stateprovider");
    // fetchMessages();
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
  }, [userId]);

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
        listView,
        setListView,
        fetchListings,
        messages,
        setMessages,
        privateConversation,
        setPrivateConversation,
        preview,
        setPreview,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
