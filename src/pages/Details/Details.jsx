import React, { useMemo, useEffect, useState } from "react";
import styles from "./Details.module.scss";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Button } from "../../components";
import PhotosModal from "../../components/Modal/PhotosModal";
import FavoriteErrorModal from "./FavoriteErrorModal";
import { ReactComponent as GridDense } from "../../assets/icons/grid-dense.svg";
import { ReactComponent as Share } from "../../assets/icons/share.svg";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";
import { ReactComponent as HeartFilled } from "../../assets/icons/heart-filled.svg";

import {
  addFavorite,
  deleteFavoriteById,
  getListingById,
  getUserById,
  newMessage,
} from "../../api/API";

import { Navigate, useParams } from "react-router-dom";

import moment from "moment";
import useAuth from "../../hooks/useAuth";

// map to render, default location is Suceava
const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: 47.6635, lng: 26.2732 }), []);
  return isLoaded ? (
    <GoogleMap
      id="map"
      mapContainerStyle={{
        width: "inherit",
        height: "25rem",
        borderRadius: "0.75rem",
      }}
      zoom={15}
      center={center}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

const Details = () => {
  // states for the details page
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [like, setLike] = useState(false);
  const [listing, setListing] = useState({});
  const [owner, setOwner] = useState({});
  const [messageContent, setMessageContent] = useState(); // not implemented yet
  //const owner = {};
  const { user } = useAuth();
  // get the id from the url
  const { id } = useParams();

  // get listing from API
  useEffect(() => {
    (async () => {
      try {
        const response = await getListingById(id);
        setListing(response);
        console.log(response, "listing");
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [id]);

  //get owner from API
  const getOwner = async () => {
    if (listing.author) {
      try {
        const response = await getUserById(listing.author.id);
        setOwner(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  useEffect(() => {
    getOwner();
  }, [getOwner, listing.author]);

  //add listing to favorites
  const handleFavorites = async () => {
    try {
      //add fav
      if (listing?.id && user?.id && like === false) {
        const response = await addFavorite(user.id, listing.id);
        setLike(true);
        console.log("add");
      }
      //remove fav
      if (listing?.id && user?.id && like === true) {
        const response = await deleteFavoriteById(user.id, listing.id);
        setLike(false);
        console.log("delete");
      } else if (user === null) {
        console.log(showNotification, "show notif");
        setShowNotification(true);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //send message
  const sendMessage = async (data) => {
    try {
      const response = await newMessage(data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //scroll to bottom ( to messages )
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  //temporary images array
  const tempImageArr = [
    { id: 1, value: listing.images },
    { id: 2, value: listing.images },
    { id: 3, value: listing.images },
    { id: 4, value: listing.images },
    { id: 5, value: listing.images },
    { id: 6, value: listing.images },
    { id: 7, value: listing.images },
    { id: 8, value: listing.images },
    { id: 9, value: listing.images },
  ];
  return (
    <section className={styles.container}>
      {/* images */}
      <div className={styles.images}>
        {tempImageArr.slice(1, 6).map((image, index) => {
          if (index === 0) {
            return (
              <img
                src={image.value}
                className={styles.largeImage}
                alt=""
                key={index}
              />
            );
          } else {
            return <img src={image.value} alt="" key={index} />;
          }
        })}

        <div className={styles.photos}>
          <Button
            variant="secondary"
            label="Show all photos"
            icon={<GridDense className={styles.gridDense} />}
            position="left"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
      </div>

      <PhotosModal
        showModal={showModal}
        setShowModal={setShowModal}
        images={tempImageArr}
      />

      {/* title */}
      <div className={styles.title}>
        <div>
          <h5 className={styles.listingName}>{listing.title}</h5>
          <h4 className={styles.listingPrice}>{listing.price} lei</h4>
        </div>
        <button className={styles.shareButton}>
          {" "}
          <Share />
          <span>Share</span>
        </button>
      </div>

      {/* details */}
      <div className={styles.details}>
        {/* description */}
        <div className={styles.listingDetails}>
          <div className={styles.description}>
            <h6>Description</h6>
            <p>{listing.description}</p>
          </div>
          {/* location */}
          <div className={styles.location}>
            <h6>Location</h6>
            <p>{listing.location}</p>
            {/* google maps */}
            <div className={styles.map}>
              <Map />
            </div>
          </div>
          {/* message seller */}
          <div className={styles.message}>
            <h6>Message the seller</h6>
            <textarea
              placeholder="Enter your message here"
              className={styles.messageBox}
              name="message"
              id="message"
              cols="30"
              rows="10"
              onChange={(e) => {
                setMessageContent(e.target.value);
                console.log(messageContent);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>

        {/* owner */}
        <div>
          <div className={styles.ownerDetails}>
            <img className={styles.ownerImage} src={owner.photo} alt="" />
            <div>
              <h6 className={styles.ownerName}>{owner.fullName}</h6>
              <p className={styles.ownerActivity}>
                Joined in
                <span> {moment(owner.createdAt).format("MMMM YYYY")}</span>
                <br />
                Response rate: <span>{owner.responseRate}</span>
                <br />
                Response time: <span>{owner.responseTime}</span>
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <Button label="Purchase" onClick={scrollToBottom} />
            <div>
              <Button
                label=""
                icon={!like ? <Heart /> : <HeartFilled />}
                position="right"
                variant="secondary"
                onClick={handleFavorites}
              />
            </div>
          </div>
        </div>
      </div>
      <FavoriteErrorModal
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
    </section>
  );
};

export default Details;
