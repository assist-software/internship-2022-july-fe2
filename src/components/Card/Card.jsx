import React from "react";
import styles from "./Card.module.scss";
import photo from "../../assets/images/splash.png";

const Card = ({ listView, image, title, location, description, price }) => {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <div
          className={`${
            listView ? styles.listCardContent : styles.cardContent
          }`}
        >
          <img
            src={image}
            alt="announces-img"
            className={`${listView ? styles.ListCardImg : styles.cardImg}`}
          />
          <div className={styles.contentCard}>
            <p className={styles.cardTitle}>{title}</p>
            <p className={styles.cardLocation}>{location}</p>
            <p
              style={{ display: listView ? "block" : "none" }}
              className={styles.cardDescription}
            >
              {description}
            </p>
            <p className={styles.cardPrice}>{price} lei</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
