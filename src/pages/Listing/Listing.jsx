import React from "react";
import Filters from "../../components/Filters/Filters";
import listingStyle from "./Listing.module.scss";
import ListObject from "./ListObject";

const Listing = ({ title, admin, hideApproval, pending, pending2 }) => {
  // view
  return (
    <div>
      <div>
        <h3 className={listingStyle.title}>{title}</h3>
      </div>
      <Filters admin={admin} />
      <ListObject
        pending={pending}
        pending2={pending2}
        hideApproval={hideApproval}
        admin={admin}
      />
    </div>
  );
};

export default Listing;
