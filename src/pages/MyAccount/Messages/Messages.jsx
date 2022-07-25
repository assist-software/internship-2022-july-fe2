import React, { useEffect } from "react";
import { Button } from "../../../components";
import styles from "./Messages.module.scss";
import chatbot from "../../../assets/images/chatbot.png";
import Conversations from "../../../components/Chat/AllMessages/Conversations";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "../../../components/Chat/Chat/Chat";
import useStateProvider from "../../../hooks/useStateProvider";
import useAuth from "../../../hooks/useAuth";

// TODO: get all conversations that the current user have

// TODO: get the name of the listings for each conversation

// TODO: send props with the informations above

const Messages = () => {
  
useEffect(() => {

},[]);

const messages = [
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
  { message: "Conteaza?" },
];
  return (
    <div className={styles.container}>
      {/* <div className={styles.noMessages}>
        <img src={chatbot} alt="" />
        <h1>You haven't sent any messages yet</h1>
        <p>This is where you'll find all of your chats and messages.</p>
        <Button />
      </div> */}
      <h4 className={styles.title}>Messages</h4>
      <div className={styles.chatContainer}>
        <div className={styles.chatLeftSide}>
          <Conversations />
          {/*<Conversations users={usersWithMessages} />*/}
        </div>

        <div className={styles.chatRigthSide}>
          {}
          <Chat messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
