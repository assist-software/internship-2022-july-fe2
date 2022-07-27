import React, { useEffect, useState } from "react";

import FavoritesError from "./FavoritesError";
import styles from "./Favorites.module.scss";
import { getFavorite, getListings } from "../../api/API";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GridRow } from "../../assets/icons/grid.svg";
import { ReactComponent as Rows } from "../../assets/icons/rows.svg";
import useAuth from "../../hooks/useAuth";
import useStateProvider from "../../hooks/useStateProvider";

const Favorites = ({ showcontrols }) => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [listings, setListings] = useState([]);
  const { favorites, setFavorites } = useStateProvider();

  useEffect(() => {
    getFavorite(userId).then((res) => setListings(res));
  }, [userId]);
  useEffect(() => {
    setFavorites(listings);
  }, [listings]);
  useEffect(() => {
    userId === null || listings === null
      ? setShowError(true)
      : setShowError(false);
  }, []);
  const [showError, setShowError] = useState(
    userId === null || listings === null ? true : false
  );

  const { listView, setListView } = useStateProvider();
  //const [like, setLike] = useState(true); //like = true ca sa setez Heart icon filled pentru carduri
  // Filtrare cards care sunt adaugate la favorite ? Backend/Frontend
  console.log(userId, "userID");
  console.log(listings, "favorites");
  return (
    <div>
      <h1 className={styles.favoritesTitle}>Favourites</h1>

      {!showError ? (
        <div>
          {/* Filters */}
          <div className={styles.gridRow}>
            <div className={listView ? null : styles.filter}>
              <GridRow
                onClick={() => {
                  setListView(false);
                }}
              />
            </div>
            <div className={listView ? styles.filter : null}>
              <Rows
                onClick={() => {
                  setListView(true);
                }}
              />
            </div>
          </div>

          {/* Cards view */}
          <div className={styles.cardView}>
            {listings?.map((listing, index) => (
              <Card
                key={index}
                image={listing.images[0]}
                title={listing.title}
                description={listing.description}
                price={listing.price}
                location={listing.location[2] + ", " + listing.location[5]}
                listingId={listing.id}
                listView={listView}
                showcontrols={!showcontrols}
                onClick={() => {
                  navigate("/listing/" + listing.id);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.favorites}>
          <FavoritesError />
        </div>
      )}
    </div>
  );
};

export default Favorites;
