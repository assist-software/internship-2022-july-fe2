import React, { useState } from "react";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";
import styles from "./ChatInput.module.scss";
import { ReactComponent as LeftArrow } from "../../../../assets/icons/send.svg";
import { newMessage } from "../../../../api/API";
import useStateProvider from "../../../../hooks/useStateProvider";
import useAuth from "../../../../hooks/useAuth";

const ChatInput = ({ messages }) => {
  const [message, setMessage] = useState("");
  const { userId } = useAuth;

  const newMess = {
    senderId: userId, //"7a62a7a6-c102-4ba5-1b97-08da6f0f0daf", // NumeDeTest   id: NumeDeTest@test.com  Pass: paroladetest
    receiverId: "deab9c9d-c7b0-4415-6f8d-08da6e30ad89", // User Doi   id: user1@exemplu.com  Pass: useruser
    listingId: "999cca2a-47a6-45a5-21c1-08da6f0fa1d7", // listing Lighthouse Apartment Tajer -> Croatia price 999999
    createdAt: "2022-07-26T06:16:26.145Z",
    updatedAt: "2022-07-26T06:16:26.145Z",
    content: "",
    viewStatus: true,
  };

  const { setAlert } = useStateProvider();

  return (
    <form
      className={styles.chatInput}
      onSubmit={(e) => {
        newMess.content = message;
        console.log(message, "mesaaaaaj ");
        const response = newMessage(newMess);
        
        if (response.status === 200) {
          setAlert({
            type: "success",
            message: "Message sent!",
          });
        }
        e.preventDefault();

        //messages.push(message);
        //console.log(message, ": messages");
        //setMessage("");
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
