import Select from "react-select";
import styles from "./Dropdown.module.scss";
import { components } from "react-select";
import PropTypes from "prop-types";
import React, { useState } from "react";

const Option = (props) => {
  return (
    <div className={styles.option}>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          className={styles.optionCheck}
        />
        <label className={styles.optionLabel}>{props.label}</label>
      </components.Option>
    </div>
  );
};

const Locations = [
  { value: "alba", label: "Alba" },
  { value: "arad", label: "Arad" },
  { value: "arges", label: "Arges" },
  { value: "bacau", label: "Bacau" },
  { value: "bihor", label: "Bihor" },
  { value: "bistrita_nasaud", label: "Bistrita-Nasaud" },
  { value: "botosani", label: "Botosani" },
  { value: "brasov", label: "Brasov" },
  { value: "braila", label: "Braila" },
  { value: "buzau", label: "Buzau" },
  { value: "caras_severin", label: "Caras-Severin" },
  { value: "calarasi", label: "Calarasi" },
  { value: "cluj", label: "Cluj" },
  { value: "constanta", label: "Constanta" },
  { value: "covasna", label: "Covasna" },
  { value: "dambovita", label: "Dambovita" },
  { value: "dolj", label: "Dolj" },
  { value: "galati", label: "Galati" },
  { value: "giurgiu", label: "Giurgiu" },
  { value: "gorj", label: "Gorj" },
  { value: "harghita", label: "Harghita" },
  { value: "hunedoara", label: "Hunedoara" },
  { value: "ialomita", label: "Ialomita" },
  { value: "iasi", label: "Iasi" },
  { value: "ilfov", label: "Ilfov" },
  { value: "maramures", label: "Maramures" },
  { value: "mehedinti", label: "Mehedinti" },
  { value: "mures", label: "Mures" },
  { value: "neamt", label: "Neamt" },
  { value: "olt", label: "Olt" },
  { value: "prahova", label: "Prahova" },
  { value: "satu_mare", label: "Satu Mare" },
  { value: "salaj", label: "Salaj" },
  { value: "sibiu", label: "Sibiu" },
  { value: "suceava", label: "Suceava" },
  { value: "teleorman", label: "Teleorman" },
  { value: "timis", label: "Timis" },
  { value: "tulcea", label: "Tulcea" },
  { value: "vaslui", label: "Vaslui" },
  { value: "valcea", label: "Valcea" },
  { value: "vrancea", label: "Vrancea" },
];

const Dropdown = ({
  fontWeight,
  fontSize,
  title,
  multi,
  options,
  searchable,
  onChange,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [multipleOption] = useState(
    multi
      ? { IndicatorSeparator: () => null, Option }
      : { IndicatorSeparator: () => null }
  );
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

  return (
    <Select
      value={selectedOptions}
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
      onChange={onChange}
      isSearchable={searchable ? true : false}
    />
  );
};

Dropdown.propTypes = {
  fontWeight: PropTypes.oneOf(["bold", "semibold", "medium", "regular"])
    .isRequired,
  fontSize: PropTypes.oneOf(["buton", "bodySmall"]).isRequired,
  placeholder: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  searchable: PropTypes.bool,
};

Dropdown.defaultProps = {
  fontWeight: "semibold",
  fontSize: "bodySmall",
  placeholder: "Placeholder",
  multi: false,
  options: Locations,
  searchable: false,
};

export default Dropdown;
