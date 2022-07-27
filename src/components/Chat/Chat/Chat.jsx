import React from "react";
import styles from "./Chat.module.scss";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";
import ChatInput from "./ChatInput/ChatInput";

const Chat = () => {
  return (
    <div className={styles.chatContainer}>
      <ChatHeader />
      <ChatBody />
      <ChatInput />
    </div>
  );
};

export default Chat;
