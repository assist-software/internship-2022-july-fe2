import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import styles from "./Messages.module.scss";
import chatbot from "../../../assets/images/chatbot.png";
import Conversations from "../../../components/Chat/AllMessages/Conversations";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "../../../components/Chat/Chat/Chat";
import useStateProvider from "../../../hooks/useStateProvider";
import useAuth from "../../../hooks/useAuth";
import { getMessageByUserId } from "../../../api/API";

const Messages = () => {
  const messagesStatic = [
    {
      message:
        "Hello! My name is James Milner and I would love purchase your listing. Please reach back to me so that we can set up a meeting to discuss further details. Thanks!",
    },
    { message: "Ce frumoasa este viata pe la 7 dimineata" },
    { message: "O brad frumos, o brad frumos, cu cetina tot verde!" },
    { message: "Tu esti copacul credincios, ce frunza nu si-o pierde." },
    { message: "E mijlocul verii si tu canti colinde?!" },
    { message: "Conteaza?" },
    { message: "O brad frumos, o brad frumos, cu cetina tot verde!" },
    { message: "Tu esti copacul credincios, ce frunza nu si-o pierde." },
    { message: "E mijlocul verii si tu canti colinde?!" },
    { message: "Conteaza?" },
  ];

  const navigate = useNavigate();
  const { messages, setMessages } = useStateProvider();
  const { userId } = useAuth();
  const [statusCode, setStatusCode] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const response = await getMessageByUserId(userId);
        if (response.status === 404) {
          setStatusCode("");
        } else if (response.status === 200) {
          setStatusCode("all good");
          setMessages(response.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [setMessages, messages, statusCode, userId]);

  return (
    <div className={styles.container}>
    {statusCode === "" ? (
        <div className={styles.noMessages}>
          <img src={chatbot} alt="" />
          <h1>You haven't sent any messages yet</h1>
          <p>This is where you'll find all of your chats and messages.</p>
          <Button label="Start exploring" onClick={() => navigate("/")} />
        </div>
      ) : (
        <>
          <h4 className={styles.title}>Messages</h4>
          <div className={styles.chatContainer}>
            <div className={styles.chatLeftSide}>
              <Conversations />
            </div>

            <div className={styles.chatRigthSide}>
              {/* <Chat messages={messagesStatic} /> */}
              <Chat />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Messages;
