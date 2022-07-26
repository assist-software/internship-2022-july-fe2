import React from "react";
import Filters from "../../components/Filters/Filters";
import listingStyle from "./Listing.module.scss";
import ListObject from "./ListObject";

const Listing = ({ title, admin, hideApproval, pending }) => {
  // view
  return (
    <div>
      <div>
        <h3 className={listingStyle.title}>{title}</h3>
      </div>
      <Filters admin={admin} />
      <ListObject pending={0} hideApproval={hideApproval} admin={admin} />
    </div>
  );
};

export default Listing;
