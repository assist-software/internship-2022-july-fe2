import React from "react";
import styles from "./Alert.module.scss";
import PropTypes from "prop-types";

const Alert = ({ type, message }) => {
  return <div className={`${styles.container} ${styles[type]}`}>{message}</div>;
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  type: "success",
  message: "Success message",
};

export default Alert;
