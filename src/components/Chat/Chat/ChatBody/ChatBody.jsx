import React from "react";
import styles from "./ChatBody.module.scss";

const ChatBody = ({ messages }) => {
  return (
    <div className={styles.chatBody}>
      {messages.map((m, index) => (
        <div
          key={index}
          className={styles.chatBodyUserMessage}
          onClick={() => console.log(index, "index")}
        >
          <div className={styles.chatBodyMessage}>{m.message}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
