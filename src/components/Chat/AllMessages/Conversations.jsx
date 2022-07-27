import React, { useState } from "react";
import styles from "./Conversations.module.scss";
import useStateProvider from "../../../hooks/useStateProvider";
import PreviewConversation from "./PreviewConversation/PreviewConversation.jsx";
import { getListingById, getUserById } from "../../../api/API";

const Conversations = ({
}) => {
  const { messages, setAlert } = useStateProvider();

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
    // <div className={styles.conversationsContainer}>
    //   {messages.map((messagePreview, index) =>
    //     (index % 2 === 0
    //       ? setMesaj1(messagePreview)
    //       : setMesaj2(messagePreview))(
    //       index >= 2 && mesaj1.senderId === mesaj2.receiverId
    //         ? (console.log(mesaj2.senderId, "equal"),
    //           (
    //             <PreviewConversation
    //               messagePreview={mesaj2}
    //               listingId={mesaj2.listingId}
    //               userReceiverId={mesaj2.receiverId}
    //             />
    //           ))
    //         : (console.log(mesaj1.receiverId, "not equal"),
    //           (
    //             <PreviewConversation
    //               messagePreview={mesaj1}
    //               listingId={mesaj1.listingId}
    //               userReceiverId={mesaj1.receiverId}
    //             />
    //           ))
    //     )
    //   )}

    // {/* <PreviewConversation active={true} />
    // <PreviewConversation />
    // <PreviewConversation />
    // <PreviewConversation />
    // <PreviewConversation /> */}
  );
};

export default Conversations;
