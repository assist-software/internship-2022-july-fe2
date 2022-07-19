import React, { useState } from "react";
import RowItem from "../RowItem/RowItem";

import styles from "./Notifications.module.scss";

import Modal from "../../../components/Modal/Modal";

const Notifications = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <h4 className={styles.title}>Notifications</h4>
      <RowItem
        title="News"
        info="Off"
        action="Edit"
        onAction={() => setShow(true)}
      />
      <RowItem title="Discounts & promotions" info="Off" action="Edit" />
      <RowItem title="Messages" info="Off" action="Edit" />
      <RowItem title="New listings" info="Off" action="Edit" />
      <RowItem title="Price change" info="Off" action="Edit" />

      {/* modal */}
      <Modal show={show} setShow={setShow} title="Notifications" />
    </div>
  );
};

export default Notifications;
