import React from "react";
import styles from "./Chat.module.scss";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatContainer from "./ChatContainer/ChatContainer";

const Chat = ({ messages }) => {
  return (
    <div className={styles.container}>
      <ChatHeader />
      <ChatContainer messages={messages} />
      <div className={styles.input}></div>
    </div>
  );
};

export default Chat;
