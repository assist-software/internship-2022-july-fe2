import React, { useState } from "react";
import styles from "./Conversations.module.scss";
import useStateProvider from "../../../hooks/useStateProvider";
import PreviewConversation from "./PreviewConversation/PreviewConversation.jsx";
import { getListingById, getUserById } from "../../../api/API";

const Conversations = () => {
  const { messages } = useStateProvider();

  const [active, setActive] = useState(false);

  return (
    <div className={styles.conversationsContainer}>
      {messages.map((messagePreview, index) =>
        messagePreview.receiverId === localStorage.getItem("receiverId") ? (
          messagePreview.listingId !== localStorage.getItem("listingId") ? (
            <PreviewConversation
              key={messagePreview.id}
              messagePreview={messagePreview}
              listingId={messagePreview.listingId}
              userReceiverId={messagePreview.receiverId}
              active={false}
              setActive={setActive}
            />
          ) : (
            <PreviewConversation
              key={messagePreview.id}
              messagePreview={messagePreview}
              listingId={messagePreview.listingId}
              userReceiverId={messagePreview.receiverId}
              active={true}
              setActive={setActive}
            />
          )
        ) : messagePreview.senderId === localStorage.getItem("userId") ? (
          messagePreview.listingId !== localStorage.getItem("listingId") ? (
            <PreviewConversation
              key={messagePreview.id}
              messagePreview={messagePreview}
              listingId={messagePreview.listingId}
              userReceiverId={messagePreview.receiverId}
              active={false}
              setActive={setActive}
            />
          ) : (
            <PreviewConversation
              key={messagePreview.id}
              messagePreview={messagePreview}
              listingId={messagePreview.listingId}
              userReceiverId={messagePreview.receiverId}
              active={true}
              setActive={setActive}
            />
          )
        ) : null
      )}
    </div>

    // {/* <PreviewConversation active={true} />
    // <PreviewConversation />
    // <PreviewConversation />
    // <PreviewConversation />
    // <PreviewConversation /> */}
  );
};

export default Conversations;
