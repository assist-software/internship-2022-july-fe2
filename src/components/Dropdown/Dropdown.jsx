import React from "react";
import Select from "react-select";
import styles from "./Dropdown.module.scss";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 3" },
  { value: "option5", label: "Option 3" },
  { value: "option6", label: "Option 3" },
  { value: "option7", label: "Option 3" },
  { value: "option8", label: "Option 3" },
  { value: "option9", label: "Option 3" },
];
const style = {
  menuList: (base) => ({
    ...base,
    height: "200px",
    boxShadow: "6px 6px 20px rgba(0, 0, 0, 0.25)",
    paddingTop: 0,
    paddingBottom: 0,
    border: 0,
    outline: 0,
    color: "black",
    "::-webkit-scrollbar": {
      width: "6px",
    },
    "::-webkit-scrollbar-track": {
      background: "$color-gray-white",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#403633",
      borderRadius: "11px!important",
      height: "2px!important",
    },
  }),
  menu: (base) => ({
    ...base,
    marginTop: 0,
    border: 0,
    outline: 0,
  }),
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? null : null,
    border: 0,
    backgroundColor: "#ffffff",
    color: "blue",
  }),
};
const Dropdown = ({ fontWeight, fontSize }) => {
  return (
    <Select
      options={options}
      className={`${styles.dropdown} ${styles[fontWeight]} ${styles[fontSize]} ${styles.classicOption}`}
      styles={style}
      placeholder="Placeholder"
      components={{ IndicatorSeparator: () => null }}
    />
  );
};

export default Dropdown;
