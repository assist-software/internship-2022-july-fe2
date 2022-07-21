import React from "react";
import styles from "./Select.module.scss";
import PropTypes from "prop-types";

const options = [
  { value: "1", label: "Lorem" },
  { value: "2", label: "Ipsum" },
  { value: "3", label: "Dolor" },
  { value: "4", label: "Sit" },
];

const Select = ({
  name,
  id,
  label,
  error,
  helper,
  value,
  options,
  onChange,
}) => {
  return (
    <div className={`${styles} ${error && styles.error}`}>
      <label htmlFor={name}>{label}</label>
      <select value={value} name={name} id={id} onChange={onChange}>
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
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.bool,
};

Select.defaultProps = {
  name: "select",
  id: "select",
  options: options,
  label: "Select",
  onChange: () => {},
  error: false,
};

export default Select;
