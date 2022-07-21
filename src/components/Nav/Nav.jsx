import React from "react";
import styles from "./Nav.module.scss";
import useAuth from "../../hooks/useAuth";

const Nav = ({ setView, view }) => {
  const { user } = useAuth();
  return (
    <div>
      {user?.role === 0 ? (
        <div className={styles.nav}>
          <button
            onClick={() => {
              setView(false);
            }}
            className={`${styles.buttons} ${!view && styles.active}`}
          >
            All listings
          </button>
          <button
            onClick={() => {
              setView(true);
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
            }}
            className={`${styles.buttons} ${!view && styles.active}`}
          >
            All listings
          </button>
          <button
            onClick={() => {
              setView(true);
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
