import React, { useState } from "react";
import styles from "./Card.module.scss";
import { ReactComponent as HeartFilled } from "../../assets/icons/heart-filled.svg";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";
import useAuth from "../../hooks/useAuth";
import {
  approveListing,
  declineListing,
  deleteListingById,
} from "../../api/API";
import Popup from "../../pages/Home/Popup";
import useStateProvider from "../../hooks/useStateProvider";

const Card = ({
  onClick,
  style,
  image,
  title,
  location,
  description,
  price,
  hideApproval,
  listingId,
  listing,
  pending,
  showcontrols,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const { setAlert } = useStateProvider();
  const { user } = useAuth();
  const [like, setLike] = useState(false);
  const [setListingIds] = useState([]);
  const { listings } = useStateProvider();
  const { fetchListings } = useStateProvider();

  //grid view list view
  const { listView } = useStateProvider();

  function stopPropagation(e) {
    e.stopPropagation();
  }

  //delete announce
  const handleDelete = async () => {
    try {
      const response = await deleteListingById(listingId);
      if (response.status === 200) {
        togglePopup();
        setAlert({ type: "Succes", message: "Deleted" });
        fetchListings();
      }
    } catch (error) {
      togglePopup();
      setAlert({
        type: "danger",
        message: "Something went wrong",
      });
    }
  };

  //Approve announce

  const handleApprove = async (id) => {
    try {
      const response = await approveListing(id);
      if (response.status === 200) {
        setAlert({
          type: "success",
          message: "Approved",
        });
        fetchListings();
      }
    } catch (error) {
      console.log(error);
      setAlert({
        type: "danger",
        message: "Something went wrong",
      });
    }
  };
  // Decline announce
  const handleDecline = async (id) => {
    try {
      const response = await declineListing(id);
      if (response.status === 200) {
        setAlert({
          type: "success",
          message: "Approved",
        });
        fetchListings();
      }
    } catch (error) {
      console.log(error);
      setAlert({
        type: "danger",
        message: "Something went wrong",
      });
    }
  };
  //popup
  const togglePopup = (props) => {
    setOpenPopup(!openPopup);
  };
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
                    onClick={() => handleApprove(listing.id)}
                    className={styles.approve}
                  >
                    Approve
                  </button>
                )}
                {pending === 0 ? (
                  <button
                    className={styles.delete}
                    onClick={() => togglePopup()}
                  >
                    <span>Delete</span>
                  </button>
                ) : (
                  <button
                    className={styles.delete}
                    onClick={() => handleDecline(listing.id)}
                  >
                    <span>Decline</span>
                  </button>
                )}
                <button className={styles.edit}>Edit</button>
              </div>
            )}

            {user?.role === 0 && (
              <div onClick={stopPropagation} className={styles.controls}>
                {user?.id === listings?.author?.id && (
                  <div>
                    <button
                      className={styles.delete}
                      onClick={() => togglePopup()}
                    >
                      <span>Delete</span>
                    </button>
                    <button className={styles.edit}>Edit</button>
                  </div>
                )}
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
