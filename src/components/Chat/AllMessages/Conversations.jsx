import React from "react";
import styles from "./Conversations.module.scss";
import SingleConversation from "./PreviewConversation/PreviewConversation.jsx";

const Conversations = () => {
  return (
    <div className={styles.container}>
      <SingleConversation active={true} />
      <SingleConversation />
      <SingleConversation />
      <SingleConversation />
    </div>
  );
};

export default Conversations;
