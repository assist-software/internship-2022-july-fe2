import React from "react";
import styles from "./ChatHeader.module.scss";
import { ReactComponent as Delete } from "../../../../assets/icons/delete.svg";
import { ReactComponent as Block } from "../../../../assets/icons/block.svg";
import { deleteAllMessages } from "../../../../api/API";
import useStateProvider from "../../../../hooks/useStateProvider";

const ChatHeader = ({ previewFromChatPreview }) => {
  const { setAlert } = useStateProvider();

  const handleDeleteMessage = async () => {
    try {
      const response = await deleteAllMessages(
        previewFromChatPreview.listingId
      );
      if (response.status === 200)
        setAlert({
          type: "success",
          message: "Conversation deleted successfully",
        });
    } catch (error) {}
  };

  return (
    <div className={styles.chatHeaderContainer}>
      <div className={styles.chatHeaderUserDetails}>
        <img
          className={styles.chatHeaderUserPhoto}
          //src="https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps="
          src={
            localStorage.getItem("photo") ||
            "https://blobassistjuly2022be2.blob.core.windows.net/repository/default%20user.png?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-08-16T17:30:43Z&st=2022-07-20T09:30:43Z&sip=0.0.0.0-255.255.255.255&spr=https&sig=RReu5GnC4EjJqvE63A00A3iK6gLCOJp9Mk%2F6eXHbeQM%3D"
          }
          alt="User profile"
        />
        <div className={styles.chatHeaderUserInfo}>
          {/* <div className={styles.chatHeaderUserName}>Jordan Henderson</div>
          <div className={styles.chatHeaderUserStatus}>Active 2d ago</div> */}
          <div className={styles.chatHeaderUserName}>
            {localStorage.getItem("receiverId") === ""
              ? "Empty chat"
              : localStorage.getItem("userName")}
          </div>
          <div className={styles.chatHeaderUserStatus}>
            {localStorage.getItem("receiverId") === "" ? null : "Active 2d ago"}
          </div>
        </div>
      </div>
      <div className={styles.chatHeaderActions}>
        {localStorage.getItem("receiverId") === "" ? null : (
          <>
            <Delete onClick={() => handleDeleteMessage()} />
            <Block />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
