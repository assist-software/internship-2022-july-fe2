import React, { useEffect, useState } from "react";
import filtersStyle from "./Filters.module.scss";
import DropdownComponent from "../Dropdown/Dropdown";
import { getListingsSort } from "../../api/API";
import GridRows from "./GridRows";
import useStateProvider from "../../hooks/useStateProvider";

const Filters = ({ setListView, admin }) => {
  // listings
  const { setListings } = useStateProvider();
  // filters state
  const { sortOrder, setSortOrder } = useStateProvider("");
  const { priceRange, setPriceRange } = useStateProvider("");
  const { locationFilter, setLocationFilter } = useStateProvider("");

  useEffect(() => {
    getListingsSort(sortOrder, locationFilter, priceRange, "", "", "", "").then(
      (res) => setListings(res)
    );
  }, [priceRange, setListings, sortOrder, locationFilter]);
  const Price = [
    { value: "", label: " All" },
    { value: "0 - 10000", label: "0 - 10.000" },
    { value: "10000 - 50000", label: "10.000 - 50.000" },
    { value: "50000 - 100000", label: "50.000 - 100.000" },
    { value: "100000 - 300000", label: "100.000 - 300.000" },
    { value: "300000 - 700000", label: "300.000 - 700.000" },
    { value: "700000 - 1000000", label: "700.000 - 1.000.000" },
  ];
  const OrderBy = [
    { value: "Popular", label: "Most Popular" },
    { value: "LowToHigh", label: "Price: Low to High" },
    { value: "HighToLow", label: "Price: High to Low" },
    { value: "Featured", label: "Featured" },
  ];

  const getValue = (e) => {
    const myArray = [];
    if (myArray.length === 0) {
      setLocationFilter("");
    }
    e.forEach((x) => {
      if (myArray.includes(x.value)) {
        myArray.splice(myArray.indexOf(x.value), 1);
      } else {
        myArray.push(x.value);
      }
      setLocationFilter(myArray);
    });
  };
  return (
    <div>
      <div className={filtersStyle.headerBtns}>
        <div className={filtersStyle.leftSide}>
          <p className={filtersStyle.filterOrderBy}>Filter by:</p>
          <div className={filtersStyle.locationPrice}>
            <DropdownComponent
              onChange={(e) => {
                getValue(e);
              }}
              multi
              title="Location"
            />
            <DropdownComponent
              options={Price}
              title="Price"
              onChange={(e) => {
                setPriceRange(e.value);
              }}
            ></DropdownComponent>
          </div>
        </div>
        <div className={filtersStyle.rightSide}>
          <p className={filtersStyle.filterOrderBy}>Order by:</p>
          <div>
            <DropdownComponent
              onChange={(e) => {
                setSortOrder(e.value);
              }}
              options={OrderBy}
              title="Most Popular"
            />
          </div>

          {!admin && <GridRows setListView={setListView} />}
        </div>
      </div>
    </div>
  );
};

export default Filters;
