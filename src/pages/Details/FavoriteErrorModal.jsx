import React from "react";
import { Modal } from "react-bootstrap";
import styles from "./Details.module.scss";
import { useNavigate } from "react-router-dom";
import idea from "../../assets/images/idea.png";
import Button from "../../components/Button/Button";

const FavoriteErrorModal = ({ showNotification, setShowNotification }) => {
  const navigate = useNavigate();
  return (
    <Modal
      show={showNotification}
      onHide={() => setShowNotification(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className={styles.favError}>
          <img src={idea} alt="User not logged" />
          <h5 className={styles.errorTitle}>Log in to add your favourites</h5>
          <p className={styles.paragraph}>
            You can add, view, or edit your favourites once you've logged in.
          </p>
          <div className={styles.button}>
            <Button
              variant={"primary"}
              label="Log in"
              onClick={() => navigate("/login")}
            />
          </div>

          <div className={styles.button}>
            <Button
              variant={"secondary"}
              label="Close"
              onClick={() => setShowNotification(false)}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FavoriteErrorModal;
