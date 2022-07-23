import React, { useState } from "react";
import styles from "./Switch.module.scss";

function Switch({ checked, name, onChange }) {
  return (
    <label className={styles.toggleSwitch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <span className={styles.switch} />
    </label>
  );
}
export default Switch;
