import React, { Fragment } from "react";
import useStateProvider from "../../hooks/useStateProvider";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import Filters from "../Filters/Filters";

const PendingApproval = ({ admin, hideApproval, pending }) => {
  const { listings } = useStateProvider();
  const navigate = useNavigate();

  return (
    <div>
      <Filters admin={admin} />
      {listings?.map(
        (listing, index) =>
          listing.status !== pending && (
            <Fragment key={`${listing.id}_${index}`}>
              <Card
                key={index}
                image={listing.images[0]}
                title={listing.title}
                description={listing.description}
                price={listing.price}
                location={listing.location[2] + " ," + listing.location[5]}
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

export default PendingApproval;
