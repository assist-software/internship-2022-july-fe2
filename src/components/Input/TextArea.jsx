import React from "react";
import styles from "./TextArea.module.scss";
import PropTypes from "prop-types";

const TextArea = ({
  error,
  id,
  label,
  name,
  onChange,
  placeholder,
  value,
  helper,
  rows,
  cols,
}) => {
  return (
    <div className={`${styles.container} ${error && styles.error}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.textArea} ${error ? styles.error : null}`}
        rows={rows}
        cols={cols}
        wrap="hard"
      />
      <p>{helper}</p>
    </div>
  );
};

TextArea.propTypes = {
  error: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  helper: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
};

TextArea.defaultProps = {
  error: false,
  id: "",
  label: "Label",
  name: "",
  onChange: () => {},
  placeholder: "Placeholder",
  helper: "",
  rows: 5,
  cols: 50,
};

export default TextArea;
