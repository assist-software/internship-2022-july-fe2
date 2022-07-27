import React, { useState, useEffect, useCallback } from "react";
import RowItem from "../RowItem/RowItem";

import styles from "./Notifications.module.scss";
import { Form, Modal } from "react-bootstrap";
import Switch from "../../../components/Switch/Switch";
import NotificationModal from "../../../components/Modal/NotificationModal";
import { updateNotification } from "../../../api/API";
import useAuth from "../../../hooks/useAuth";
import useStateProvider from "../../../hooks/useStateProvider";

const Notifications = () => {
  // show modal
  const [show, setShow] = useState(false);

  // iser
  const { user, fetchUser } = useAuth();

  // state provider
  const { setAlert } = useStateProvider();

  // current modal
  const [currentModal, setCurrentModal] = useState(null);

  // notification settings
  const [notificationSettings, setNotificationsSettings] = useState(
    user?.notificationResponse
  );

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
      case "newsNotificationDto":
        return "News";
      case "messagesNotificationDto":
        return "Messages";
      case "listingsNotificationDto":
        return "Listings";
      case "priceChangeNotificationDto":
        return "Price Change";
      case "discountNotificationDto":
        return "Discounts";
      default:
        break;
    }
  };

  // dynamic modal description
  const modalDescription = (modal) => {
    switch (modal) {
      case "newsNotificationDto":
        return "Receive news about new listings, price changes, and discounts.";
      case "messagesNotificationDto":
        return "Receive messages from your landlord.";
      case "listingsNotificationDto":
        return "Receive notifications when a listing is added to your favorites.";
      case "priceChangeNotificationDto":
        return "Receive notifications when a listing price changes.";
      case "discountNotificationDto":
        return "Receive notifications when a listing has a discount.";
      default:
        break;
    }
  };

  // handle submit
  const handleSubmit = async () => {
    try {
      const response = await updateNotification(user?.id, notificationSettings);
      if (response.status === 200) {
        console.log("Success");
        setAlert({
          type: "success",
          message: "Notifications updated successfully",
        });
        fetchUser();
      }
    } catch (error) {
      console.log(error);
      setAlert({
        type: "danger",
        message: "Something went wrong on server",
      });
    }
  };

  const [skip, setSkip] = useState(true);

  useEffect(() => {
    if (skip) setSkip(false);
    if (!skip) handleSubmit();
  }, [notificationSettings]);

  return (
    <>
      <div>
        <h4 className={styles.title}>Notifications</h4>
        <RowItem
          onAction={() => handleModalShow("newsNotificationDto")}
          title="News"
          info={`${
            !user?.notificationResponse?.newsNotificationDto?.email &&
            !user?.notificationResponse?.newsNotificationDto?.sms
              ? "Off"
              : "On"
          }`}
          action="Edit"
        />
        <RowItem
          onAction={() => handleModalShow("discountNotificationDto")}
          title="Discounts & promotions"
          info={`${
            // !notificationSettings.discounts.email &&
            // !notificationSettings.discounts.sms
            !user?.notificationResponse?.newsNotificationDto?.email &&
            !user?.notificationResponse?.newsNotificationDto?.sms
              ? "Off"
              : "On"
          }`}
          action="Edit"
        />
        <RowItem
          onAction={() => handleModalShow("messagesNotificationDto")}
          title="Messages"
          info={`${
            !user?.notificationResponse?.messagesNotificationDto?.email &&
            !user?.notificationResponse?.messagesNotificationDto?.sms
              ? "Off"
              : "On"
          }`}
          action="Edit"
        />
        <RowItem
          onAction={() => handleModalShow("listingsNotificationDto")}
          title="New listings"
          info={`${
            !user?.notificationResponse?.listingsNotificationDto?.email &&
            !user?.notificationResponse?.listingsNotificationDto?.sms
              ? "Off"
              : "On"
          }`}
          action="Edit"
        />
        <RowItem
          onAction={() => handleModalShow("priceChangeNotificationDto")}
          title="Price change"
          info={`${
            !user?.notificationResponse?.priceChangeNotificationDto?.email &&
            !user?.notificationResponse?.priceChangeNotificationDto?.sms
              ? "Off"
              : "On"
          }`}
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
