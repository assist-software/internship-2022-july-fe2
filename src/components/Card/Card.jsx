import React from "react";
import styles from "./Card.module.scss";

const Card = ({
  onClick,
  style,
  listView,
  image,
  title,
  location,
  description,
  price,
}) => {
  return (
    <div className={styles.cards}>
      <div onClick={onClick} className={styles.card}>
        <div
          style={style}
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
            <div
              className={`${styles.listTitleAndLocation} ${
                !listView && styles.col
              }`}
            >
              <p className={styles.cardTitle}>{title}</p>
              <p className={styles.cardLocation}>{location}</p>
            </div>

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
