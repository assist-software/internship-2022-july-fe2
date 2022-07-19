import React from "react";
import styles from "./Select.module.scss";
import PropTypes from "prop-types";

const options = [
  { value: "1", label: "Lorem" },
  { value: "2", label: "Ipsum" },
  { value: "3", label: "Dolor" },
  { value: "4", label: "Sit" },
];

const Select = ({ name, id, label, helper, value, options, onChange }) => {
  return (
    <div className={styles}>
      <label htmlFor={name}>{label}</label>
      <select value={value} name={name} id={id} onChange={onChange}>
        <option disabled>Select a gender</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p>{helper}</p>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  name: "select",
  id: "select",
  options: options,
  label: "Select",
  onChange: () => {},
};

export default Select;
