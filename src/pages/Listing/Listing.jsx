import React, { useState } from "react";
import Filters from "../../components/Filters/Filters";
import listingStyle from "./Listing.module.scss";
import ListObject from "./ListObject";

const Listing = ({ title, admin, hideApproval, pending }) => {
  // view
  const [listView, setListView] = useState(true);

  return (
    <div>
      <div>
        <h3 className={listingStyle.title}>{title}</h3>
      </div>
      <Filters admin={admin} setListView={setListView} />
      <ListObject
        pending={pending}
        hideApproval={hideApproval}
        admin={admin}
        listView={listView}
      />
    </div>
  );
};

export default Listing;
