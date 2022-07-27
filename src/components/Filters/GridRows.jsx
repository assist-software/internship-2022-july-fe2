import React from "react";
import filtersStyle from "./Filters.module.scss";
import { ReactComponent as GridRow } from "../../assets/icons/grid.svg";
import { ReactComponent as Rows } from "../../assets/icons/rows.svg";
import useStateProvider from "../../hooks/useStateProvider";

const GridRows = () => {
  //grid view list view
  const { listView, setListView } = useStateProvider();
  return (
    <div className={filtersStyle.showGrid}>
      <div className={filtersStyle.gridRow}>
        <div className={listView ? null : filtersStyle.filter}>
          <GridRow
            onClick={() => {
              setListView(false);
            }}
          />
        </div>
        <div className={listView ? filtersStyle.filter : null}>
          <Rows
            onClick={() => {
              setListView(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GridRows;
