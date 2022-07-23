import React from "react";
import styles from "./PreviewConversation.module.scss";

const PreviewConversation = ({ active }) => {
  return (
    <div
      className={`${styles.messageContainer} ${active ? styles.active : ""}`}
    >
      <img
        className={styles.messageUserProfile}
        src="https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps="
        alt="profile"
      />
      <div className={styles.messageContent}>
        <div className={styles.messageHeader}>
          <div className={styles.messageHeaderUsername}>Jordan Henderson</div>
          <div className={styles.messageHeaderTime}>12:22</div>
        </div>

        <div className={styles.messageBody}>
          <div className={styles.messageBodyListingTitle}>
            Dreamy Treehouse Above Park City
          </div>
          <div className={styles.messageBodyLastMessage}>
            Definitely tempting and that sounds
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewConversation;
