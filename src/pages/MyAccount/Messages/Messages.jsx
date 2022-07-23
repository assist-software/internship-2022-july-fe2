import React from "react";
import { Button } from "../../../components";
import styles from "./Messages.module.scss";
import chatbot from "../../../assets/images/chatbot.png";
import AllConversations from "../../../components/Chat/AllMessages/Conversations";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "../../../components/Chat/Chat/Chat";

const Messages = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.noMessages}>
        <img src={chatbot} alt="" />
        <h1>You haven't sent any messages yet</h1>
        <p>This is where you'll find all of your chats and messages.</p>
        <Button />
      </div> */}
      <h4 className={styles.title}>Messages</h4>
      <div className={styles.chatContainer}>
        <div className={styles.chatLeftSide}>
          <AllConversations />
        </div>

        <div className={styles.chatRigthSide}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Messages;
