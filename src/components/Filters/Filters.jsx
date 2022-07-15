import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { ReactComponent as GridRow } from "../../assets/icons/grid.svg";
import { ReactComponent as Rows } from "../../assets/icons/rows.svg";
import filtersStyle from "./Filters.module.scss";
const Filters = ({ setListView }) => {
  return (
    <div>
      <div className={filtersStyle.headerBtns}>
        <div className={filtersStyle.leftSide}>
          <p className={filtersStyle.filterOrderBy}>Filter by:</p>
          <Dropdown>
            <Dropdown.Toggle className={filtersStyle.dropdownTitle}>
              Location
            </Dropdown.Toggle>

            <Dropdown.Menu className={filtersStyle.dropMenu}>
              <Dropdown.ItemText className={filtersStyle.hello}>
                Hello!
              </Dropdown.ItemText>
              <Dropdown.Item className={filtersStyle.profileOption}>
                <input type="checkbox" />
                <label>Label</label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle className={filtersStyle.dropdownTitle}>
              Price
            </Dropdown.Toggle>

            <Dropdown.Menu className={filtersStyle.dropMenu}>
              <Dropdown.ItemText className={filtersStyle.hello}>
                Hello!
              </Dropdown.ItemText>
              <Dropdown.Item
                href="#action/3.1"
                className={filtersStyle.profileOption}
              >
                Profile
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={filtersStyle.rightSide}>
          <p className={filtersStyle.filterOrderBy}>Order by:</p>
          <Dropdown>
            <Dropdown.Toggle className={filtersStyle.dropdownTitle}>
              Location
            </Dropdown.Toggle>

            <Dropdown.Menu className={filtersStyle.dropMenu}>
              <Dropdown.ItemText className={filtersStyle.hello}>
                Hello!
              </Dropdown.ItemText>
              <Dropdown.Item className={filtersStyle.profileOption}>
                <input type="checkbox" />
                <label>Label</label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
  );
};

export default Filters;
