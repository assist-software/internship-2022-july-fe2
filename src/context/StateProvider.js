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
  const [privateConversation, setPrivateConversation] = useState(false);
  const [privateMessages, setPrivateMessages] = useState([]);
  const { userId } = useAuth();

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
      if (userId !== null) {
        const response = await getFavorite(userId);
        setFavorites(response);

        console.log(response);
      }
    } catch (error) {}
  };
  useEffect(() => {
    localStorage.setItem("userName", "");
    localStorage.setItem("receiverId", "");
    localStorage.setItem(
      "photo",
      "https://blobassistjuly2022be2.blob.core.windows.net/repository/default%20user.png?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-08-16T17:30:43Z&st=2022-07-20T09:30:43Z&sip=0.0.0.0-255.255.255.255&spr=https&sig=RReu5GnC4EjJqvE63A00A3iK6gLCOJp9Mk%2F6eXHbeQM%3D"
    );
    localStorage.setItem("listingId", "");
    setPrivateMessages([]);
    if (userId !== null) fetchFavorites();
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
        privateMessages,
        setPrivateMessages,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
