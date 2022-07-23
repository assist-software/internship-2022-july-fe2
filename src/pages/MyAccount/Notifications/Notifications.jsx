import React, { useState } from "react";
import RowItem from "../RowItem/RowItem";

import styles from "./Notifications.module.scss";
import { Form, Modal } from "react-bootstrap";
import Switch from "../../../components/Switch/Switch";
import NotificationModal from "../../../components/Modal/NotificationModal";

const Notifications = () => {
  // show modal
  const [show, setShow] = useState(false);

  // current modal
  const [currentModal, setCurrentModal] = useState(null);

  // notification settings
  const [notificationSettings, setNotificationsSettings] = useState({
    news: {
      email: false,
      sms: false,
    },
    discounts: {
      email: false,
      sms: false,
    },
    messages: {
      email: false,
      sms: false,
    },
    listings: {
      email: false,
      sms: false,
    },
    priceChange: {
      email: false,
      sms: false,
    },
  });

  // handle email change
  const handleEmailChange = () => {
    setNotificationsSettings({
      ...notificationSettings,
      [currentModal]: {
        ...notificationSettings[currentModal],
        email: !notificationSettings[currentModal].email,
        // submit to server
      },
    });
  };

  // handle sms change
  const handleSmsChange = () => {
    setNotificationsSettings({
      ...notificationSettings,
      [currentModal]: {
        ...notificationSettings[currentModal],
        sms: !notificationSettings[currentModal].sms,
        // submit to server
      },
    });
  };

  // handle modal show
  const handleModalShow = (modal) => {
    setCurrentModal(modal);
    setShow(true);
  };

  // handle modal hide
  const handleModalHide = () => {
    setCurrentModal(null);
    setShow(false);
  };

  // dynamic modal title
  const modalTitle = (modal) => {
    switch (modal) {
      case "news":
        return "News";
      case "messages":
        return "Messages";
      case "listings":
        return "Listings";
      case "priceChange":
        return "Price Change";
      case "discounts":
        return "Discounts";
      default:
        break;
    }
  };

  // dynamic modal description
  const modalDescription = (modal) => {
    switch (modal) {
      case "news":
        return "Receive news about new listings, price changes, and discounts.";
      case "messages":
        return "Receive messages from your landlord.";
      case "listings":
        return "Receive notifications when a listing is added to your favorites.";
      case "priceChange":
        return "Receive notifications when a listing price changes.";
      case "discounts":
        return "Receive notifications when a listing has a discount.";
      default:
        break;
    }
  };

  return (
    <>
      <div>
        <h4 className={styles.title}>Notifications</h4>
        <RowItem
          onAction={() => handleModalShow("news")}
          title="News"
          info="Off"
          action="Edit"
        />
        <RowItem
          onAction={() => handleModalShow("discounts")}
          title="Discounts & promotions"
          info="Off"
          action="Edit"
        />
        <RowItem
          onAction={() => handleModalShow("messages")}
          title="Messages"
          info="Off"
          action="Edit"
        />
        <RowItem
          onAction={() => handleModalShow("listings")}
          title="New listings"
          info="Off"
          action="Edit"
        />
        <RowItem
          onAction={() => handleModalShow("priceChange")}
          title="Price change"
          info="Off"
          action="Edit"
        />
      </div>

      <NotificationModal
        title={modalTitle(currentModal)}
        description={modalDescription(currentModal)}
        show={show}
        onHide={handleModalHide}
        // handle email switch
        onEmailChange={handleEmailChange}
        checkedEmail={notificationSettings[currentModal]?.email || false}
        // handle sms switch
        onSmsChange={handleSmsChange}
        checkedSms={notificationSettings[currentModal]?.sms || false}
      />
    </>
  );
};

export default Notifications;
