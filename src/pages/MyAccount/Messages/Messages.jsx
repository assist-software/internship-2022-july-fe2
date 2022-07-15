import React from "react";
import { Button } from "../../../components";
import styles from "./Messages.module.scss";
import chatbot from "../../../assets/images/chatbot.png";

const Messages = () => {
  return (
    <div className={styles.container}>
      <div className="">
        <img src={chatbot} alt="" />
        <h1>You haven't sent any messages yet</h1>
        <p>This is where you'll find all of your chats and messages.</p>
        <Button />
      </div>
    </div>
  );
};

export default Messages;
