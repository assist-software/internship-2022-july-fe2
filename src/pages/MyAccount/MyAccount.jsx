import React, { useState } from "react";
import styles from "./MyAccount.module.scss";
import { Button } from "../../components";
import { ReactComponent as ProfileIcon } from "../../assets/icons/person.svg";
import { ReactComponent as SecurityIcon } from "../../assets/icons/security.svg";
import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import { ReactComponent as ChatIcon } from "../../assets/icons/chat.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import Profile from "./Profile/Profile";
import Security from "./Security/Security";
import Notifications from "./Notifications/Notifications";
import Messages from "./Messages/Messages";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const tabSelector = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "security":
        return <Security />;
      case "notifications":
        return <Notifications />;
      case "messages":
        return <Messages />;
      default:
        break;
    }
  };
  return (
    <section className={styles.container}>
      {/* navigation section */}
      <div>
        <img
          className={styles.profilePicture}
          src={"https://picsum.photos/200/300"}
          alt="profile"
        />
        <nav className={styles.navigation}>
          <button onClick={() => setActiveTab("profile")}>
            <ProfileIcon />
            Profile
          </button>
          <button onClick={() => setActiveTab("security")}>
            <SecurityIcon />
            Login & security
          </button>
          <button onClick={() => setActiveTab("notifications")}>
            <BellIcon />
            Notifications
          </button>
          <button onClick={() => setActiveTab("messages")}>
            <ChatIcon />
            Messages
          </button>
          <button onClick={() => console.log("Logout clicked")}>
            <LogoutIcon />
            Logout
          </button>
        </nav>
      </div>
      {/* main section */}
      <div className={styles.content}>{tabSelector()}</div>
    </section>
  );
};

export default MyAccount;
