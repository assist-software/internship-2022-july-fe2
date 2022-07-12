import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ variant, disabled, label }) => {
  return <button className={(styles.button, styles[variant])}>{label}</button>;
};

Button.propTypes = {
  variant: PropTypes.string.isRequired,
};

Button.defaultProps = {
  variant: "primary",
};

export default Button;
