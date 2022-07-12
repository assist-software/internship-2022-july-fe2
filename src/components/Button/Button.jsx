import React from 'react'
import PropTypes from "prop-types";
import styles from "./Button.module.scss"

const Button = ({primary, secondary, disabled, label}) => {
  return (
    <div className={primary ? styles.button : styles.secondary}>{label}</div>
  )
}

Button.propTypes = {
  primary: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default Button