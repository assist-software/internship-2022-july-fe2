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
  newMessage,
} from "../../api/API";

import { useParams } from "react-router-dom";

import moment from "moment";
import useAuth from "../../hooks/useAuth";
import useStateProvider from "../../hooks/useStateProvider";
import TextArea from "../../components/Input/TextArea";

// map to render
const Map = ({ center }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

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
  const [messageContent, setMessageContent] = useState("");

  const { user } = useAuth();
  const { setAlert } = useStateProvider();
  // get the id from the url
  const { id } = useParams();

  // message
  const [message, setMessage] = useState({});

  // get listing from API
  useEffect(() => {
    (async () => {
      try {
        const response = await getListingById(id);
        setListing(response.data);
        console.log(response);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [id]);

  // update message object useEffect
  useEffect(() => {
    setMessage({
      ...message,
      senderId: user?.id,
      receiverId: listing?.author?.id,
      listingId: listing?.id,
      content: messageContent,
    });
  }, [user?.id, listing?.author?.id, listing?.id, messageContent]);

  console.log(message);

  // set message object usecallback

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

  //scroll to bottom ( to messages )
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // send message to API
  const handleSendMessage = async () => {
    console.log(message);
    try {
      const response = await newMessage(message);
      if (response.status === 201) {
        setMessageContent("");
        setAlert({
          type: "success",
          message: "Message sent successfully",
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      setAlert({
        type: "error",
        message: "Error sending message",
      });
    }
  };

  return (
    <section className={styles.container}>
      {/* images */}
      <div className={styles.images}>
        {listing?.images?.slice(1, 6).map((image, index) => {
          if (index === 0) {
            return (
              <img
                key={index}
                src={image}
                className={styles.largeImage}
                alt=""
              />
            );
          } else {
            return <img key={index} src={image} alt="" />;
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
        images={listing?.images}
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
            <p>
              {listing?.location &&
                listing?.location[2] +
                  ", " +
                  (listing?.location[3].length > 0
                    ? listing?.location[3] + " , "
                    : "") +
                  listing?.location[5]}
            </p>
            {/* google maps */}
            <div className={styles.map}>
              <Map
                center={{
                  lat: listing.location ? parseFloat(listing?.location[0]) : 0,
                  lng: listing.location ? parseFloat(listing?.location[1]) : 0,
                }}
              />
              {/* lat={59.838} lng={14.619} */}
            </div>
          </div>
          {/* message seller */}
          <div className={styles.message}>
            <h6>Message the seller</h6>
            <TextArea
              label=""
              value={messageContent}
              placeholder="Enter your message here"
              onChange={(e) => setMessageContent(e.target.value)}
              name="message"
              id="message"
              cols={20}
              rows={5}
            />
            <Button
              variant="secondary"
              className={styles.sendButton}
              onClick={handleSendMessage}
              label="Send"
              disabled={messageContent?.length < 1 ? true : false}
            />
          </div>
        </div>

        {/* owner */}
        <div>
          <div className={styles.ownerDetails}>
            <img
              className={styles.ownerImage}
              src={listing?.author?.photo}
              alt=""
            />
            <div>
              <h6 className={styles.ownerName}>{listing?.author?.fullName}</h6>
              <p className={styles.ownerActivity}>
                Joined on
                <span>
                  {" "}
                  {moment(listing?.author?.createdAt).format("MMMM YYYY")}
                </span>
                <br />
                Response rate: <span>90%</span>
                <br />
                Response time: <span>1h</span>
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
