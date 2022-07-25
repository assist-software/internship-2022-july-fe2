import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Switch from "../Switch/Switch";

import styles from "./NotificationModal.module.scss";

import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

const NotificationModal = ({
  show,
  onHide,
  title,
  description,

  checkedEmail,
  checkedSms,

  onEmailChange,
  onSmsChange,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.container}
    >
      <button className={styles.closeButton} onClick={onHide}>
        <CloseIcon />
      </button>
      <Modal.Body className={styles.modalBody}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>

        {/* email */}
        <div className={styles.actions}>
          <div>
            Email
            <span>
              <Switch
                name="email"
                checked={checkedEmail}
                onChange={onEmailChange}
              />
            </span>
          </div>
          {/* sms */}
          <div>
            SMS
            <span>
              <Switch name="sms" checked={checkedSms} onChange={onSmsChange} />
            </span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NotificationModal;
