import React from "react";
import styles from "./Nav.module.scss";
import useAuth from "../../hooks/useAuth";
import useStateProvider from "../../hooks/useStateProvider";

const Nav = ({ setView, view }) => {
  const { user } = useAuth();
  const { setSortOrder } = useStateProvider("");
  const { setPriceRange } = useStateProvider("");
  const { setLocationFilter } = useStateProvider("");
  return (
    <div>
      {user?.role === 0 ? (
        <div className={styles.nav}>
          <button
            onClick={() => {
              setSortOrder("");
              setPriceRange("");
              setLocationFilter("");
              setTimeout(() => {
                setView(false);
              }, 30);
            }}
            className={`${styles.buttons} ${!view && styles.active}`}
          >
            All listings
          </button>
          <button
            onClick={() => {
              setView(true);
              setSortOrder("");
              setPriceRange("");
              setLocationFilter("");
            }}
            className={`${styles.buttons} ${view && styles.active}`}
          >
            My listings
          </button>
        </div>
      ) : null}
      {user?.role === 1 ? (
        <div className={styles.nav}>
          <button
            onClick={() => {
              setView(false);
              setSortOrder("");
              setPriceRange("");
              setLocationFilter("");
            }}
            className={`${styles.buttons} ${!view && styles.active}`}
          >
            All listings
          </button>
          <button
            onClick={() => {
              setView(true);
              setSortOrder("");
              setPriceRange("");
              setLocationFilter("");
            }}
            className={`${styles.buttons} ${view && styles.active}`}
          >
            Pending approval
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Nav;
