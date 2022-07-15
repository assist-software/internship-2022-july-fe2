import React, { useEffect, useState } from "react";
import { getListings } from "../../api/API";
import Card from "../../components/Card/Card";
import Filters from "../../components/Filters/Filters";
import listingStyle from "./Listing.module.scss";

const Listing = ({ title }) => {
  const [listings, setListings] = useState([]);
  console.log(listings);
  useEffect(() => {
    getListings().then((res) => setListings(res));
  }, []);
  const [listView, setListView] = useState(true);

  return (
    <div>
      <div>
        <h3 className={listingStyle.title}>Latest</h3>
      </div>
      <Filters setListView={setListView} />

      {listings?.map((listing, index) => (
        <Card
          key={index}
          image={listing.images}
          title={listing.title}
          description={listing.description}
          price={listing.price}
          location={listing.location}
          listView={listView}
        />
      ))}
    </div>
  );
};

export default Listing;
