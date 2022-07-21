import React from "react";
import { useNavigate } from "react-router-dom";
import idea from "../../assets/images/idea.png";
import Button from "../../components/Button/Button";
import styles from "./Favorites.module.scss";

const FavoritesError = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.favError}>
      <img src={idea} alt="User not logged" />
      <h5 className={styles.errorTitle}>Log in to view your favourites</h5>
      <p className={styles.paragraph}>
        You can add, view, or edit your favourites once you've logged in.
      </p>
      <div className={styles.button}>
        <Button
          variant={"primary"}
          label="Log in"
          onClick={() => navigate("/login")}
        />
      </div>

      <div className={styles.button}>
        <Button
          variant={"secondary"}
          label="Home"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default FavoritesError;
