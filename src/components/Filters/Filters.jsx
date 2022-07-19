import React, { useEffect, useState } from "react";
import filtersStyle from "./Filters.module.scss";
import DropdownComponent from "../Dropdown/Dropdown";
import { getListings } from "../../api/API";
import GridRows from "./GridRows";

const Filters = ({ setListView, hideControls }) => {
  const [listings, setListings] = useState([]);
  console.log(listings);
  useEffect(() => {
    getListings().then((res) => setListings(res));
  }, []);

  return (
    <div>
      <div className={filtersStyle.headerBtns}>
        <div className={filtersStyle.leftSide}>
          <p className={filtersStyle.filterOrderBy}>Filter by:</p>
          <div className={filtersStyle.locationPrice}>
            <DropdownComponent multi title="Location" />
            <DropdownComponent title="Price" />
          </div>
        </div>
        <div className={filtersStyle.rightSide}>
          <p className={filtersStyle.filterOrderBy}>Order by:</p>
          <div>
            <DropdownComponent title="Most Popular" />
          </div>

          {!hideControls && <GridRows setListView={setListView} />}
        </div>
      </div>
    </div>
  );
};

export default Filters;
