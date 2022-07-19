import React, { useState } from "react";
import Select from "react-select";
import styles from "./Dropdown.module.scss";
import { components } from "react-select";
import PropTypes from "prop-types";

const Option = (props) => {
  return (
    <div className={styles.option}>
      {" "}
      <components.Option {...props}>
        {" "}
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          className={styles.optionCheck}
        />{" "}
        <label className={styles.optionLabel}>{props.label}</label>
      </components.Option>
    </div>
  );
};

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 3" },
  { value: "option5", label: "Option 3" },
  { value: "option6", label: "Option 3" },
  { value: "option7", label: "Option 12" },
  { value: "option8", label: "Option 3" },
  { value: "option9", label: "Option 9" },
];

const Dropdown = ({ fontWeight, fontSize, title, multi }) => {
  const multipleOption = multi
    ? { IndicatorSeparator: () => null, Option }
    : { IndicatorSeparator: () => null };

  function setColor(fontSize) {
    if (fontSize === "buton") return "$color-primary-500";
    else return "black";
  }
  const color = setColor(fontSize);
  const style = {
    menuList: (base) => ({
      ...base,
      height: "200px",
      boxShadow: "6px 6px 20px rgba(0, 0, 0, 0.25)",
      paddingTop: 0,
      paddingBottom: 0,
      border: 0,
      outline: 0,
      color: "$color-gray-400",
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
      backgroundColor: "transparent",
      color: "#0241ae",
      cursor: "pointer",
    }),
    placeholder: (base, state) => ({
      ...base,
      color: color,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: color,
      "&:hover": {
        color: color,
      },
    }),
  };
  // function handleOnChange(param) {
  //   // setSelected(e.target.value)
  //   console.log(param[0].value);
  // }

  return (
    <Select
      options={options}
      className={`${styles.dropdown} ${styles[fontWeight]} ${styles[fontSize]} ${styles.classicOption}`}
      styles={style}
      placeholder={title}
      components={multipleOption}
      isMulti={multi ? true : null}
      closeMenuOnSelect={multi ? false : true}
      hideSelectedOptions={multi ? false : true}
      defaultValue={title}
      controlShouldRenderValue={multi ? false : true}
      // onChange={handleOnChange}
    />
  );
};

Dropdown.propTypes = {
  fontWeight: PropTypes.oneOf(["bold", "semibold", "medium", "regular"])
    .isRequired,
  fontSize: PropTypes.oneOf(["buton", "bodySmall"]).isRequired,
  placeholder: PropTypes.string.isRequired,
  multi: PropTypes.bool,
};

Dropdown.defaultProps = {
  fontWeight: "semibold",
  fontSize: "bodySmall",
  placeholder: "Placeholder",
  multi: false,
};

export default Dropdown;
