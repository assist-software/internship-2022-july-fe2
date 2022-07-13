import React from "react";
import styles from "./Card.module.scss";
import photo from "../../assets/images/splash.png";
const Card = (props) => {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <div
          className={`${
            props.showGrid ? styles.listCardContent : styles.cardContent
          }`}
        >
          <img
            src={photo}
            alt="announces-img"
            className={`${
              props.showGrid ? styles.ListCardImg : styles.cardImg
            }`}
          />
          <div className={styles.contentCard}>
            <p className={styles.cardTitle}>{props.title}</p>
            <p className={styles.cardLocation}>{props.location}</p>
            <p
              style={{ display: props.showGrid ? "block" : "none" }}
              className={styles.cardDescription}
            >
              {props.description}
            </p>
            <p className={styles.cardPrice}>{props.price} lei</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
