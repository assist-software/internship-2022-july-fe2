import React, { useEffect, useRef, useState } from "react";
import {
  getMessageByUserId,
  getPrivateConversation,
} from "../../../../api/API";
import useAuth from "../../../../hooks/useAuth";
import styles from "./ChatBody.module.scss";

const ChatBody = ({ previewFromChatPreview }) => {
  const messageRef = useRef();
  const { userId } = useAuth();
  const [privateMessages, setPrivateMessages] = useState([]);

  // get listing from API
  useEffect(() => {
    (async () => {
      try {
        console.log(
          // previewFromChatPreview.userId,
          localStorage.getItem("receiverId"),
          "sender",
          userId,
          "receiver",
          localStorage.getItem("listingId")
          // previewFromChatPreview.listingId
        );
        setPrivateMessages([]);
        const response = await getPrivateConversation(
          localStorage.getItem("receiverId"),
          userId,
          localStorage.getItem("listingId")
        );
        console.log(response, "response");
        privateMessages.push(response?.data);
        //debugger;
        console.log(privateMessages, "conversation");
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [privateMessages]);

  return (
    <div ref={messageRef} className={styles.chatBody}>
      {privateMessages.map((message, index) => (
        <div
          key={index}
          className={styles.chatBodyUserMessage}
          onClick={() => console.log(index, "index")}
        >
          <div className={styles.chatBodyMessage}>{index}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
