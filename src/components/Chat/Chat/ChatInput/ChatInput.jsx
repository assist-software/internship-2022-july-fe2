import React, { useState } from "react";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";
import styles from "./ChatInput.module.scss";
import { ReactComponent as LeftArrow } from "../../../../assets/icons/send.svg";

const ChatInput = ({ messages }) => {
  const [message, setMessage] = useState("");
  return (
    <form
      className={styles.chatInput}
      onSubmit={(e) => {
        e.preventDefault();
        messages.push(message);
        console.log(message, ": messages");
        setMessage("");
      }}
    >
      <Input
        className={styles.inputChat}
        value={message}
        label=""
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className={styles.chatInputButtonBlueCircle} onClick={(e) => {}}>
        <button type="submit" disabled={!message}>
          <LeftArrow stroke="white" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
