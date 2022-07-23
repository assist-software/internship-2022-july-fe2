import React from "react";
import styles from "./ChatHeader.module.scss";
import { ReactComponent as Delete } from "../../../../assets/icons/delete.svg";
import { ReactComponent as Block } from "../../../../assets/icons/block.svg";

const ChatHeader = () => {
  return (
    <div className={styles.chatHeaderContainer}>
      <div className={styles.chatHeaderUserDetails}>
        <img
          className={styles.chatHeaderUserPhoto}
          src="https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps="
          alt="User profile"
        />
        <div className={styles.chatHeaderUserInfo}>
          <div className={styles.chatHeaderUserName}>Jordan Henderson</div>
          <div className={styles.chatHeaderUserStatus}>Active 2d ago</div>
        </div>
      </div>
      <div className={styles.chatHeaderActions}>
        <Delete />
        <Block />
      </div>
    </div>
  );
};

export default ChatHeader;
