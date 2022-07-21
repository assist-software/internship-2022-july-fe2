import React, { useEffect, useState } from "react";
import filtersStyle from "./Filters.module.scss";
import DropdownComponent from "../Dropdown/Dropdown";
import { getListings, getListingsSort } from "../../api/API";
import GridRows from "./GridRows";

const Filters = ({ setListView, admin }) => {
  const [listings, setListings] = useState(null);
  console.log(listings, "filters listings");
  useEffect(() => {
    getListingsSort("", "", "", "", "", "", "").then((res) => setListings(res));
  }, []);

  const handleSort = async (e) => {
    try {
      const response = await getListingsSort("", "", e, "", "", "", "");
      setListings(response);
      console.log(response, "response");
    } catch (error) {}
  };

  const Price = [
    { value: "", label: "Price" },
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
  return (
    <div>
      <div className={filtersStyle.headerBtns}>
        <div className={filtersStyle.leftSide}>
          <p className={filtersStyle.filterOrderBy}>Filter by:</p>
          <div className={filtersStyle.locationPrice}>
            <DropdownComponent
              onChange={(e) => {
                // handleSort(e.value);
              }}
              multi
              title="Location"
            />
            <DropdownComponent
              options={Price}
              title="Price"
              onChange={(e) => {
                handleSort(e.value);
                console.log(e.value);
              }}
            ></DropdownComponent>
          </div>
        </div>
        <div className={filtersStyle.rightSide}>
          <p className={filtersStyle.filterOrderBy}>Order by:</p>
          <div>
            <DropdownComponent options={OrderBy} title="Most Popular" />
          </div>

          {!admin && <GridRows setListView={setListView} />}
        </div>
      </div>
    </div>
  );
};

export default Filters;
