import React, { useState, useEffect } from "react";
import styles from "./PreviewConversation.module.scss";
import {
  getListingById,
  getPrivateConversation,
  getUserById,
} from "../../../../api/API";
import useStateProvider from "../../../../hooks/useStateProvider";
import useAuth from "../../../../hooks/useAuth";

const PreviewConversation = ({
  messagePreview,
  userReceiverId,
  listingId,
  active,
  setActive,
}) => {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [listTitle, setListTitle] = useState("");
  const { userId } = useAuth();

  const {
    privateConversation,
    setPrivateConversation,
    privateMessages,
    setPrivateMessages,
  } = useStateProvider();

  // const getUserName = async (senderId) => {
  //   try {
  //     const response = await getUserById(senderId);
  //     if (response?.status === 200) {
  //       // setUserInterestedOfListing(response?.data);
  //       return response?.data.fullName;
  //     }
  //   } catch (e) {
  //     console.error(e);
  //     setAlert({
  //       type: "danger",
  //       message: "Something went wrong with loading the user name!",
  //     });
  //   }
  // };

  // const getListing = async (listingId) => {
  //   try {
  //     const response = await getListingById(listingId);
  //     // setListingTitle(response?.data.title);
  //     return response?.data.title;
  //   } catch (e) {
  //     console.error(e);
  //     setAlert({
  //       type: "danger",
  //       message: "Something went wrong with loading the name of listing!",
  //     });
  //   }
  // };

  useEffect(() => {
    (async () => {
      try {
        const response = await getListingById(listingId);
        
        setListTitle(response?.data.title);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [listingId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserById(userReceiverId);
        setUserName(response?.data.fullName);
        setUserPhoto(response.data.photo);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [userName, userReceiverId]);

  const handlePrivateConversation = () => {
    // setPrivateMessages([]);
    setActive(!active);

    localStorage.setItem("receiverId", userReceiverId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("listingId", listingId);
    localStorage.setItem("photo", userPhoto);
    setPrivateConversation(true);
    console.log(
      localStorage.getItem("receiverId"),
      "sender",
      userId,
      "receiver",
      localStorage.getItem("listingId"),
      "from previewConv"
    );

    // NEW ADDED FROM CHATBODY
    (async () => {
      try {
        console.log(
          localStorage.getItem("receiverId"),
          "sender",
          localStorage.getItem("userId"),
          "receiver",
          localStorage.getItem("listingId"),
          "from Chatbody"
        );
        // setPrivateMessages([]);
        if (
          localStorage.getItem("receiverId") !== "" &&
          localStorage.getItem("listingId") !== ""
        ) {
          // console.log("test");
          // debugger;
          const response = await getPrivateConversation(
            localStorage.getItem("receiverId"),
            localStorage.getItem("userId"),
            localStorage.getItem("listingId")
          );
          console.log(response, "response");
          // setPrivateMessages([]);
          privateMessages.push(response.data);

          console.log(privateMessages, "conversation");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  };

  // const [active, setActive] = useState(false);
  return (
    <div
      key={messagePreview.id}
      className={`${styles.previewContainer} ${
        active === true ? styles.active : null
      }`}
      onClick={(e) => {
        //setActive(!active);
        //console.log(active, "actiev");
        handlePrivateConversation();
      }}
    >
      <img
        className={styles.previewUserProfile}
        //src="https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps="
        src={userPhoto}
        alt="IMG"
      />
      <div className={styles.previewContent}>
        <div className={styles.previewHeader}>
          {/* <div className={styles.previewHeaderUsername}>Jordan Henderson</div>  */}
          <div className={styles.previewHeaderUsername}>{userName}</div>
          {/* {user.fullName} */}
          <div className={styles.previewHeaderTime}>12:22</div>
        </div>

        <div className={styles.previewBody}>
          {/* <div className={styles.previewBodyListingTitle}>
            Dreamy Treehouse Above Park City
          </div> */}
          <div className={styles.previewBodyListingTitle}>{listTitle}</div>
          {/* <div className={styles.previewBodyLastMessage}>
            Definitely tempting and that sounds
          </div> */}
          <div className={styles.previewBodyLastMessage}>
            {messagePreview.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewConversation;
