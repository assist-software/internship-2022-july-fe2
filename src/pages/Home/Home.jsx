import React, { useEffect, useState } from "react";
import { getListings } from "../../api/API";

import { Card } from "../../components";

const Home = () => {
  const [listings, setListings] = useState([]);
  console.log(listings);
  useEffect(() => {
    getListings().then((res) => setListings(res));
  }, []);
  return (
    <div>
      {listings?.map((listing, index) => (
        <Card
          image={listing.images}
          title={listing.title}
          description={listing.description}
          price={listing.price}
          location={listing.location}
        />
      ))}
    </div>
  );
};

export default Home;
