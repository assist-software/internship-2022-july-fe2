import React, { useMemo, useState } from "react";
import styles from "./Preview.module.scss";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Button } from "../../components";
import { ReactComponent as GridDense } from "../../assets/icons/grid-dense.svg";
import { ReactComponent as Share } from "../../assets/icons/share.svg";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";
import { ReactComponent as HeartFilled } from "../../assets/icons/heart-filled.svg";
import useStateProvider from "../../hooks/useStateProvider";

import moment from "moment";
import { useNavigate } from "react-router-dom";
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

const Preview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { preview, setPreview } = useStateProvider();
  console.log(preview, "preview?");
  const [like, setLike] = useState(false);

  //clear preview after submit
  const clearPreview = () => {
    setPreview({});
    navigate("/");
  };

  //temporary images
  const tempImageArr = [
    { id: 1, value: preview?.images },
    { id: 2, value: preview?.images },
    { id: 3, value: preview?.images },
    { id: 4, value: preview?.images },
    { id: 5, value: preview?.images },
    { id: 6, value: preview?.images },
    { id: 7, value: preview?.images },
    { id: 8, value: preview?.images },
    { id: 9, value: preview?.images },
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
          />
        </div>
      </div>

      {/* title */}
      <div className={styles.title}>
        <div>
          <h5 className={styles.listingName}>{preview?.title}</h5>
          <h4 className={styles.listingPrice}>{preview?.price} lei</h4>
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
            <p>{preview?.description}</p>
          </div>
          {/* location */}
          <div className={styles.location}>
            <h6>Location</h6>
            <p>{preview?.location?.city}</p>
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

        <div>
          <div className={styles.ownerDetails}>
            <img className={styles.ownerImage} src={user?.photo} alt="" />
            <div>
              <h6 className={styles.ownerName}>{user?.fullName}</h6>
              <p className={styles.ownerActivity}>
                Joiner in
                <span> {moment(user?.createdAt).format("MMMM YYYY")}</span>
                <br />
                Response rate: <span>{user?.responseRate}</span>
                <br />
                Response time: <span>{user?.responseTime}</span>
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <Button label="Purchase" />
            <div>
              <Button
                label=""
                icon={!like ? <Heart /> : <HeartFilled />}
                position="right"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <p>This is a preview of your listing</p>
        <div>
          <Button
            label="Edit"
            variant="secondary"
            onClick={() => navigate("/add")}
          />
          <Button label="Publish" variant="primary" onClick={clearPreview} />
        </div>
      </div>
    </section>
  );
};

export default Preview;
