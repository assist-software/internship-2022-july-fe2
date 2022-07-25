import React, { useEffect, useRef } from "react";
import styles from "./ChatBody.module.scss";

const ChatBody = ({ messages }) => {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div ref={messageRef} className={styles.chatBody}>
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
