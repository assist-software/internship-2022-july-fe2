import React, { Fragment, useEffect, useState } from "react";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import useStateProvider from "../../hooks/useStateProvider";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./MyListing.module.scss";
const MyListings = ({ admin, hideApproval, pending, showcontrols }) => {
  const navigate = useNavigate();
  const { listings } = useStateProvider();
  const [openPopup, setOpenPopup] = useState(false);
  const { user } = useAuth();
  //grid view list view
  const { listView, setListView } = useStateProvider();

  function stopPropagation(e) {
    e.stopPropagation();
  }
  //popup
  const togglePopup = (props) => {
    setOpenPopup(!openPopup);
  };
  return (
    <div className={styles.content}>
      <Filters admin={admin} />
      {listings?.map(
        (listing, index) =>
          user?.id === listing.author.id && (
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
                showcontrols={showcontrols}
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
