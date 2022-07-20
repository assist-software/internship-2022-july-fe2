import React from "react";
import Button from "../Button/Button";
import styles from "./Nav.module.scss";
import useAuth from "../../hooks/useAuth";

const Nav = () => {
  const { user } = useAuth();
  return (
    <div>
      {user?.role === "user" ? (
        <div className={styles.nav}>
          <button className={styles.buttons}>All listings</button>
          <button className={styles.buttons}>My listings</button>
        </div>
      ) : null}
      {user?.role === "admin" ? (
        <div className={styles.nav}>
          <button className={styles.buttons}>All listings</button>
          <button className={styles.buttons}>Pending approval</button>
        </div>
      ) : null}
    </div>
  );
};

export default Nav;
