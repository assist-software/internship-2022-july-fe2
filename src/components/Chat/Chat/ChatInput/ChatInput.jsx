import React, { useState } from "react";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";
import styles from "./ChatInput.module.scss";
import { ReactComponent as LeftArrow } from "../../../../assets/icons/send.svg";
import { newMessage } from "../../../../api/API";
import useStateProvider from "../../../../hooks/useStateProvider";
import useAuth from "../../../../hooks/useAuth";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { userId } = useAuth;

  const newMess = {
    senderId: localStorage.getItem("userId"),
    receiverId: localStorage.getItem("receiverId"),
    listingId: localStorage.getItem("listingId"),
    createdAt: "2022-07-27T12:09:40.947Z",
    updatedAt: "2022-07-27T12:09:40.947Z",
    content: message,
    viewStatus: true,
  };

  const { setAlert } = useStateProvider();

  return (
    <form
      className={styles.chatInput}
      onSubmit={(e) => {
        e.preventDefault();
        try {
          newMess.content = message;
          console.log(message, "mesaaaaaj ");
          const response = newMessage(newMess);

          if (response.status === 201) {
            setAlert({
              type: "success",
              message: "Message sent!",
            });
          }

          setMessage("");
          //messages.push(message);
          //console.log(message, ": messages");
        } catch (e) {
          console.log("Error: ", e);
          setAlert({
            type: "error",
            message: "Error sending message",
          });
        }
      }}
    >
      {localStorage.getItem("receiverId") !== "" &&
        localStorage.getItem("listingId") !== "" && (
          <>
            <Input
              className={styles.inputChat}
              value={message}
              label=""
              placeholder="Message..."
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className={styles.chatInputButtonBlueCircle}>
              <button type="submit" disabled={!message}>
                <LeftArrow stroke="white" />
              </button>
            </div>
          </>
        )}
    </form>
  );
};

export default ChatInput;
