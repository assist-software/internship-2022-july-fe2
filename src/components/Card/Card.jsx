import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { ReactComponent as HeartFilled } from "../../assets/icons/heart-filled.svg";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";
import useAuth from "../../hooks/useAuth";
import { deleteListingById, getFavorite, putListingById } from "../../api/API";
import setAlert from "../../components/Alert/Alert";
import Popup from "../../pages/Home/Popup";
import useStateProvider from "../../hooks/useStateProvider";
const Card = ({
  onClick,
  style,
  listView,
  image,
  title,
  location,
  description,
  price,
  hideApproval,
  listingId,
  listing,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const { user, userId } = useAuth();
  const { favorites } = useStateProvider();
  // const [favourites, setFavourites] = useState([]);
  // useEffect(() => {
  //   getFavorite(userId).then((res) => setFavourites(res));
  // }, [userId]);

  const [like, setLike] = useState(false);
  const [listingIds, setListingIds] = useState([]);
  function stopPropagation(e) {
    e.stopPropagation();
  }

  //delete announce
  const handleDelete = async () => {
    try {
      const response = await deleteListingById(listingId);
      if (response.status === 200) {
        setAlert({ type: "Succes", message: "Deleted" });
      }
    } catch (error) {}
  };

  //Approve announce
  const handleApprove = async () => {
    try {
      console.log(listing, "LISTIG");
      listing.status = 0;
      const response = await putListingById(listingId, listing);
      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
  };
  //popup
  const togglePopup = (props) => {
    setOpenPopup(!openPopup);
  };

  useEffect(() => {
    favorites.forEach((favorite) => {
      if (favorite.id === listingId) setLike(true);
    });
  }, []);

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
              onClick={() => {
                setLike(!like);
                setListingIds(listingId);
              }}
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
            {user?.role === 1 && (
              <div onClick={stopPropagation} className={styles.controls}>
                {hideApproval && (
                  <button
                    onClick={() => handleApprove(listingId, listing)}
                    className={styles.approve}
                  >
                    Approve
                  </button>
                )}
                <button className={styles.delete} onClick={() => togglePopup()}>
                  <span>Delete</span>
                </button>
                <button className={styles.edit}>Edit</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* POPUP delete */}
      {openPopup && (
        <Popup
          setOpenPopup={setOpenPopup}
          openPopup={openPopup}
          content={
            <div className={styles.popup}>
              <h3 className={styles.titlePopup}>Delete listing</h3>
              <p className={styles.descriptionPopup}>
                You cannot recover the listing after deleting it.
              </p>
              <div className={styles.butonsPopup}>
                <button
                  className={styles.deletePopup}
                  onClick={(e) => handleDelete(e)}
                >
                  Delete
                </button>
                <button
                  className={styles.backPopup}
                  onClick={() => setOpenPopup(!openPopup)}
                >
                  Back
                </button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Card;
