import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { ReactComponent as HeartFilled } from "../../assets/icons/heart-filled.svg";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";

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
  const [like, setLike] = useState(false);
  function stopPropagation(e) {
    e.stopPropagation();
  }
  return (
    <div className={styles.cards}>
      <div onClick={onClick} className={styles.card}>
        <div
          style={style}
          className={`${
            listView ? styles.listCardContent : styles.cardContent
          }`}
        >
          <div onClick={stopPropagation}>
            <button
              className={`${listView ? styles.heartList : styles.heartCard}`}
              onClick={() => setLike(!like)}
            >
              {!like ? <Heart /> : <HeartFilled className={styles.heartFill} />}
            </button>
          </div>

          <div className={styles.imagesDiv}>
            <img
              src={image}
              alt="announces-img"
              className={`${listView ? styles.ListCardImg : styles.cardImg}`}
            />
          </div>

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
