import React, { useEffect, useState } from "react";
import { ReactComponent as GridRow } from "../../assets/icons/grid.svg";
import { ReactComponent as Rows } from "../../assets/icons/rows.svg";
import filtersStyle from "./Filters.module.scss";
import DropdownComponent from "../Dropdown/Dropdown";
import { getListings } from "../../api/API";

const Filters = ({ setListView }) => {
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
          <div className={filtersStyle.gridRow}>
            <GridRow
              onClick={() => {
                setListView(false);
              }}
            />
            <Rows
              onClick={() => {
                setListView(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
