import React, { useEffect, useRef, useState } from "react";
import {
  getMessageByUserId,
  getPrivateConversation,
} from "../../../../api/API";
import useAuth from "../../../../hooks/useAuth";
import useStateProvider from "../../../../hooks/useStateProvider";
import styles from "./ChatBody.module.scss";

const ChatBody = () => {
  const messageRef = useRef();
  const { userId } = useAuth();
  const {
    privateConversation,
    setPrivateConversation,
    privateMessages,
    setPrivateMessages,
  } = useStateProvider();

  // get listing from API
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log(
  //         localStorage.getItem("receiverId"),
  //         "sender",
  //         localStorage.getItem("userId"),
  //         "receiver",
  //         localStorage.getItem("listingId"),
  //         "from Chatbody"
  //       );
  //       // setPrivateMessages([]);
  //       if (
  //         localStorage.getItem("receiverId") !== "" &&
  //         localStorage.getItem("listingId") !== ""
  //       ) {
  //         // console.log("test");
  //         // debugger;
  //         const response = await getPrivateConversation(
  //           localStorage.getItem("receiverId"),
  //           localStorage.getItem("userId"),
  //           localStorage.getItem("listingId")
  //         );
  //         console.log(response, "response");
  //         privateMessages.push(response.data);

  //         console.log(privateMessages, "conversation");
  //       }
  //     } catch (error) {
  //       console.log("Error: ", error);
  //     }
  //   })();
  // }, [privateConversation]);


  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div ref={messageRef} className={styles.chatBody}>
      {privateMessages.map((message, index) =>
        message.map((msg, index2) => (
          <div
            key={msg.id}
            className={styles.chatBodyUserMessage}
            onClick={() => console.log(index, "index")}
          >
            <div className={styles.chatBodyMessage}>{msg.content}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatBody;
