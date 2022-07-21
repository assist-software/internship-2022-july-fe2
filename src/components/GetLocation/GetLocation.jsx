import React, { useEffect, useRef, useState } from "react";

import styles from "./GetLocation.module.scss";

import { ReactComponent as Radio } from "../../assets/icons/radiobutton.svg";

// selims api key, 300$ with github plan
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// google services
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

// load script async
function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

// extract address from google place object
const extractAddress = (place) => {
  const address = {
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const state = this.state ? this.state + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const country = this.country ? this.country + ", " : "";
      return `${city}${state}${zip}${country}`;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });

  return address;
};

// extract coordinates from google place object
const extractCoordinates = (place) => {
  const coords = {
    lat: "",
    lng: "",
  };

  if (place.geometry) {
    coords.lat = place.geometry.location.lat();
    coords.lng = place.geometry.location.lng();
  }

  return coords;
};

function GetLocation({
  address,
  coords,
  setAddress,
  setCoords,
  error,
  helper = "",
  name,
  id,
  value,
}) {
  const searchInput = useRef(null);

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // on address change, set states
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress(extractAddress(place));
    setCoords(extractCoordinates(place));
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  //   extract user coordinates to address
  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    setCoords({ lat, lng });
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = extractAddress(place);
        setAddress(_address);
        searchInput.current.value = _address.plain();
      });
  };

  // get user location
  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });
    }
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);
  return (
    <div className={error ? styles.error : ""}>
      <label htmlFor={name}>Location</label>
      <div className={styles.locationInput}>
        <input
          value={value}
          name={name}
          id={id}
          ref={searchInput}
          type="text"
          placeholder="Search location..."
        />

        <button onClick={findMyLocation}>
          <Radio />
        </button>
      </div>
      <p className={styles.helper}>{helper}</p>
    </div>
  );
}

export default GetLocation;
