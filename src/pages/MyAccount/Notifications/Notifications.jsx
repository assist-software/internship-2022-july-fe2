import React from "react";
import RowItem from "../RowItem/RowItem";

import styles from "./Notifications.module.scss";

const Notifications = () => {
  return (
    <div>
      <h4 className={styles.title}>Notifications</h4>
      <RowItem title="News" info="Off" action="Edit" />
      <RowItem title="Discounts & promotions" info="Off" action="Edit" />
      <RowItem title="Messages" info="Off" action="Edit" />
      <RowItem title="New listings" info="Off" action="Edit" />
      <RowItem title="Price change" info="Off" action="Edit" />
    </div>
  );
};

export default Notifications;
