import React from "react";
import styles from "./Conversations.module.scss";
import SingleConversation from "./PreviewConversation/PreviewConversation.jsx";

const Conversations = ({ users }) => {
  return (
    <div className={styles.conversationsContainer}>
      {/* {users.map((user, index) => (
        <SingleConversation user={user} key={index} active={false} />
      ))} */}
      <SingleConversation active={true} />
      <SingleConversation />
      <SingleConversation />
      <SingleConversation />
      <SingleConversation />
    </div>
  );
};

export default Conversations;
