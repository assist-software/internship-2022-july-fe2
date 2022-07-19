import React, { useMemo, useEffect, useState } from "react";
import styles from "./Details.module.scss";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Button } from "../../components";

import { getListingById, getUserById } from "../../api/API";

import { useParams } from "react-router-dom";

import moment from "moment";

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
  const [listing, setListing] = useState({});
  const [owner, setOwner] = useState({});

  // get the id from the url
  const { id } = useParams();

  // get listing from API
  useEffect(() => {
    (async () => {
      try {
        const response = await getListingById(id);
        setListing(response);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, []);

  // get owner from API
  const getOwner = async () => {
    if (listing.author) {
      try {
        const response = await getUserById(listing.author);
        setOwner(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  useEffect(() => {
    getOwner();
  }, [listing.author]);

  return (
    <section className={styles.container}>
      {/* images */}
      <div className={styles.images}>
        <img
          className={styles.largeImage}
          src="https://picsum.photos/200/300"
          alt=""
        />
        <img src="https://picsum.photos/200/300" alt="" />
        <img src="https://picsum.photos/200/300" alt="" />
        <img src="https://picsum.photos/200/300" alt="" />
        <img src="https://picsum.photos/200/300" alt="" />
      </div>

      {/* title */}
      <div className={styles.title}>
        <div>
          <h5 className={styles.listingName}>{listing.title}</h5>
          <h4 className={styles.listingPrice}>123456 lei</h4>
        </div>
        <button className={styles.shareButton}>Share</button>
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
            />
            <button>Send</button>
          </div>
        </div>

        {/* owner */}
        <div>
          <div className={styles.ownerDetails}>
            <img className={styles.ownerImage} src={owner.photo} alt="" />
            <div>
              <h6 className={styles.ownerName}>{owner.fullName}</h6>
              <p className={styles.ownerActivity}>
                Joiner in
                <span> {moment(owner.createdAt).format("MMMM YYYY")}</span>
                <br />
                Response rate: <span>{owner.responseRate}</span>
                <br />
                Response time: <span>{owner.responseTime}</span>
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <Button label="Purchase" />
            <Button label="Like" variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
