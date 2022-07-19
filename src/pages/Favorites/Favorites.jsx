import React, { useEffect, useState } from "react";

import FavoritesError from "./FavoritesError";
import styles from "./Favorites.module.scss";
import { getListings } from "../../api/API";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GridRow } from "../../assets/icons/grid.svg";
import { ReactComponent as Rows } from "../../assets/icons/rows.svg";

const Favorites = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false); //daca user se logheaza setShowError=true / daca nu e logat e false
  const [listings, setListings] = useState([]);
  useEffect(() => {
    getListings().then((res) => setListings(res));
  }, []);
  const [listView, setListView] = useState(true);

  // Filtrare cards care sunt adaugate la favorite ? Backend/Frontend

  return (
    <div className={styles.container}>
      <h1 className={styles.favoritesTitle}>Favourites</h1>

      {showError ? (
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
      ) : (
        <div className={styles.favorites}>
          <FavoritesError />
        </div>
      )}
    </div>
  );
};

export default Favorites;
