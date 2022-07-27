import React from "react";
import styles from "./Chat.module.scss";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";
import ChatInput from "./ChatInput/ChatInput";

const Chat = ({ messages, previewFromChatPreview }) => {
  return (
    <div className={styles.chatContainer}>
      <ChatHeader previewFromChatPreview={previewFromChatPreview} />
      <ChatBody previewFromChatPreview={previewFromChatPreview} />
      <ChatInput previewFromChatPreview={previewFromChatPreview} />
    </div>
  );
};

export default Chat;
