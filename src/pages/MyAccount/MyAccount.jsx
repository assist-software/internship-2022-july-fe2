import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// auth
import { logout } from "../../hooks/useAuth";

// icons
import { ReactComponent as ProfileIcon } from "../../assets/icons/person.svg";
import { ReactComponent as SecurityIcon } from "../../assets/icons/security.svg";
import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import { ReactComponent as ChatIcon } from "../../assets/icons/chat.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";

// tabs
import Profile from "./Profile/Profile";
import Security from "./Security/Security";
import Notifications from "./Notifications/Notifications";
import Messages from "./Messages/Messages";

// styles
import styles from "./MyAccount.module.scss";

const MyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = location.pathname.split("/")[2];
  const tabSelector = () => {
    switch (currentTab) {
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
        <nav className={`${styles.navigation}`}>
          <button onClick={() => navigate("/my-account/profile")}>
            <ProfileIcon />
            Profile
          </button>
          <button onClick={() => navigate("/my-account/security")}>
            <SecurityIcon />
            Login & security
          </button>
          <button onClick={() => navigate("/my-account/notifications")}>
            <BellIcon />
            Notifications
          </button>
          <button onClick={() => navigate("/my-account/messages")}>
            <ChatIcon />
            Messages
          </button>
          <button
            onClick={() => {
              console.log("Logout clicked");
            }}
          >
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
