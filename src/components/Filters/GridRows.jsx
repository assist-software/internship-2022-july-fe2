import React from "react";
import filtersStyle from "./Filters.module.scss";
import { ReactComponent as GridRow } from "../../assets/icons/grid.svg";
import { ReactComponent as Rows } from "../../assets/icons/rows.svg";
import useStateProvider from "../../hooks/useStateProvider";
const GridRows = () => {
  //grid view list view
  const { setListView } = useStateProvider();
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
