import React, { useMemo } from "react";
import styles from "./Details.module.scss";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Button } from "../../components";

import { ReactComponent as Heart } from "../../assets/icons/heart.svg";

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
          <h5 className={styles.listingName}>
            Dreamy Treehouse Above Park City
          </h5>
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
            <p>
              Lörem ipsum infraling nyr platoren preska platin. Okun vugt serat,
              tetrangen. Farat heterovis husanar ifall resade. Satsig mitulåd
              gyn. Faranat fehugon pneumaskop respektive spökgarn tonöning.
              Teger donök. Termopod Dylanman i tevänas om teras prehepp.
              Förpappring. Anöde kvasiskade sogisk, donedat att terravision.
              Kare mida. Ilogi löhung på samude. Skimma wiki att demynar.
              Detehuvis nemykaligen i rutkod i regen alltså nyhet. Bebel pos
              ultral ing osovis. Dinade pede, lagon respektive homopangen, i
              predast. Bek saktiga gohåssa. Epil kasam väck ses seling. Väsat
              beng, trisk, juholtare.
            </p>
          </div>
          {/* location */}
          <div className={styles.location}>
            <h6>Location</h6>
            <p>City, Country</p>
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
            <img
              className={styles.ownerImage}
              src="https://picsum.photos/200/300"
              alt=""
            />
            <div>
              <h6 className={styles.ownerName}>Jordan Henderson</h6>
              <p className={styles.ownerActivity}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <Button label="Purchase" />
            <Button
              icon={<Heart />}
              position="left"
              label=""
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
