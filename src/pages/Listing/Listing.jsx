import React, { useEffect, useState } from "react";
import { getListings } from "../../api/API";
import Card from "../../components/Card/Card";
import Filters from "../../components/Filters/Filters";
import listingStyle from "./Listing.module.scss";

import { useNavigate } from "react-router-dom";

const Listing = ({ title, hideControls }) => {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    getListings().then((res) => setListings(res));
  }, []);

  // view
  const [listView, setListView] = useState(true);

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h3 className={listingStyle.title}>{title}</h3>
      </div>
      <Filters hideControls={hideControls} setListView={setListView} />

      {listings?.map((listing, index) => (
        <Card
          key={index}
          image={listing.images}
          title={listing.title}
          description={listing.description}
          price={listing.price}
          location={listing.location}
          listView={listView}
          onClick={() => {
            navigate("/listing/" + listing.id);
          }}
        />
      ))}
    </div>
  );
};

export default Listing;
