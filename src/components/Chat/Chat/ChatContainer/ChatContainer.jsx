import React from "react";
import styles from "./ChatContainer.module.scss";

const ChatContainer = ({ messages }) => {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatContainerMessages}>
        {messages.map((m, index) => (
          <div
            key={index}
            className={styles.chatContainerMessage}
            onClick={() => console.log(index, "index")}
          >
            {m.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatContainer;
