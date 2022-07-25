import React, { useEffect, useState } from "react";

import FavoritesError from "./FavoritesError";
import styles from "./Favorites.module.scss";
import { getFavorite, getListings } from "../../api/API";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GridRow } from "../../assets/icons/grid.svg";
import { ReactComponent as Rows } from "../../assets/icons/rows.svg";
import useAuth from "../../hooks/useAuth";

const Favorites = () => {
  const navigate = useNavigate();
  const { user, userId } = useAuth();
  console.log(user, "user");
  const [showError, setShowError] = useState(user === null ? true : false);
  const [listings, setListings] = useState([]);
  useEffect(() => {
    user === null ? setShowError(true) : setShowError(false);
  }, []);
  useEffect(() => {
    getFavorite(user?.id).then((res) => setListings(res));
  }, [userId]);
  const [listView, setListView] = useState(true);
  const [like, setLike] = useState(true); //like = true ca sa setez Heart icon filled pentru carduri
  // Filtrare cards care sunt adaugate la favorite ? Backend/Frontend
  console.log(userId, "userID");
  return user ? (
    <div className={styles.container}>
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
                image={listing.images}
                title={listing.title}
                description={listing.description}
                price={listing.price}
                location={listing.location}
                listView={listView}
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
  ) : (
    <div>Loading...</div>
  );
};

export default Favorites;
