import React, { useState } from "react";
import styles from "./Conversations.module.scss";
import useStateProvider from "../../../hooks/useStateProvider";
import PreviewConversation from "./PreviewConversation/PreviewConversation.jsx";
import { getListingById, getUserById } from "../../../api/API";

const Conversations = () => {
  const { messages, setAlert } = useStateProvider();

  return (
    <div className={styles.conversationsContainer}>
      {messages.map((messagePreview, index) => (
        <PreviewConversation
          messagePreview={messagePreview}
          listingId={messagePreview.listingId}
          userReceiverId={messagePreview.receiverId}
        />
      ))}
      {/* <PreviewConversation active={true} />
      <PreviewConversation />
      <PreviewConversation />
      <PreviewConversation />
      <PreviewConversation /> */}
    </div>
  );
};

export default Conversations;
