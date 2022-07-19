import React from "react";
import styles from "./RowItem.module.scss";

const RowItem = ({ active, title, info, action, onAction, onCancel }) => {
  return (
    <div className={styles.container}>
      <span>
        <h6 className={styles.title}>{title}</h6>
        <p className={styles.info}>{info}</p>
      </span>

      {active ? (
        <button className={styles.action} onClick={onCancel}>
          Cancel
        </button>
      ) : (
        <button className={styles.action} onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
};

export default RowItem;
