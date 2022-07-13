import React from "react";
import styles from "./Input.module.scss";
import PropTypes from "prop-types";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";

const Input = ({
  error,
  icon,
  id,
  label,
  name,
  onBlur,
  onChange,
  onClick,
  onIconClick,
  placeholder,
  type,
  value,
}) => {
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        onClick={onClick}
        placeholder={placeholder}
        className={error ? styles.error : null}
        type={type}
      />
      <span onClick={onIconClick} className={styles.icon}>
        {icon}
      </span>
    </div>
  );
};

Input.propTypes = {
  error: PropTypes.bool,
  icon: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onIconClick: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
};

Input.defaultProps = {
  error: false,
  icon: <Heart />,
  id: "",
  label: "",
  name: "",
  onBlur: () => {},
  onChange: () => {},
  onClick: () => {},
  onIconClick: () => {},
  placeholder: "",
  type: "text",
};

export default Input;
