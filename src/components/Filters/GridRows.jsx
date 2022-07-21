import React from "react";
import filtersStyle from "./Filters.module.scss";
import { ReactComponent as GridRow } from "../../assets/icons/grid.svg";
import { ReactComponent as Rows } from "../../assets/icons/rows.svg";
const GridRows = ({ setListView }) => {
  return (
    <div className={filtersStyle.showGrid}>
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
  );
};

export default GridRows;
