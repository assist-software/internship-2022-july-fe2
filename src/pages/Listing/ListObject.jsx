import React, { useEffect, useState } from "react";
import { getListings } from "../../api/API";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";

const ListObject = ({ listView, admin, hideApproval, pending }) => {
  const [listings, setListings] = useState([]);
  console.log(listings, "listobject listings");

  useEffect(() => {
    getListings().then((res) => setListings(res));
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      {listings?.map(
        (listing, index) =>
          listing.status !== pending && (
            <>
              <Card
                key={index}
                image={listing.images}
                title={listing.title}
                description={listing.description}
                price={listing.price}
                location={listing.location}
                listView={listView}
                listingId={listing.id}
                admin={admin}
                hideApproval={hideApproval}
                onIdClick={() => console.log(listing.id, "ghjk")}
                onClick={() => {
                  navigate("/listing/" + listing.id);
                }}
              />
            </>
          )
      )}
    </div>
  );
};

export default ListObject;
