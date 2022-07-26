import React, { Fragment } from "react";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import useStateProvider from "../../hooks/useStateProvider";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const MyListings = ({ admin, hideApproval, pending }) => {
  const { listings } = useStateProvider();
  const navigate = useNavigate();
  const { user } = useAuth();
  //grid view list view
  const { listView } = useStateProvider();
  return (
    <div>
      <Filters admin={admin} />
      {listings?.map(
        (listing, index) =>
          user?.id === listing.author.id && (
            <Fragment key={`${listing.id}_${index}`}>
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
                listing={listing}
                pending={pending}
                onClick={() => {
                  navigate("/listing/" + listing.id);
                }}
              />
            </Fragment>
          )
      )}
    </div>
  );
};

export default MyListings;
