import React from "react";
import { Button } from "../../../components";
import styles from "./Messages.module.scss";
import chatbot from "../../../assets/images/chatbot.png";
import Conversations from "../../../components/Chat/AllMessages/Conversations";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "../../../components/Chat/Chat/Chat";

// TODO: get all conversations that the current user have

// TODO: get the name of the listings for each conversation

// TODO: send props with the informations above

const messages = [
  { message: "Acasa este foarte frumos" },
  { message: "Ce frumoasa este viata pe la 7 dimineata" },
  { message: "O brad frumos, o brad frumos, cu cetina tot verde!" },
  { message: "Tu esti copacul credincios, ce frunza nu si-o pierde" },
  { message: "E mijlocul verii si tu canti colinde?!" },
  { message: "Conteaza?" },
];

const Messages = () => {
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
