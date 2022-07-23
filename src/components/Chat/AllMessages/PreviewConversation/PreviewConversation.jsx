import React from "react";
import styles from "./PreviewConversation.module.scss";

const PreviewConversation = ({ user, key, active }) => {
  return (
    <div key={key}
      className={`${styles.previewContainer} ${active ? styles.active : ""}`}
    >
      <img
        className={styles.previewUserProfile}
        src="https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps="
        alt="profile"
      />
      <div className={styles.previewContent}>
        <div className={styles.previewHeader}>
          <div className={styles.previewHeaderUsername}>Jordan Henderson</div> 
          {/* {user.fullName} */}
          <div className={styles.previewHeaderTime}>12:22</div>
        </div>

        <div className={styles.previewBody}>
          <div className={styles.previewBodyListingTitle}>
            Dreamy Treehouse Above Park City
          </div>
          <div className={styles.previewBodyLastMessage}>
            Definitely tempting and that sounds
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewConversation;
