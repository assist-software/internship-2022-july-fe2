import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// icons
import { ReactComponent as ProfileIcon } from "../../assets/icons/person.svg";
import { ReactComponent as SecurityIcon } from "../../assets/icons/security.svg";
import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import { ReactComponent as ChatIcon } from "../../assets/icons/chat.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check-circle.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";

// tabs
import Profile from "./Profile/Profile";
import Security from "./Security/Security";
import Notifications from "./Notifications/Notifications";
import Messages from "./Messages/Messages";

// styles
import styles from "./MyAccount.module.scss";

// useauth
import useAuth from "../../hooks/useAuth";
import useStateProvider from "../../hooks/useStateProvider";

// API
import { getMessageByUserId, updateUser } from "../../api/API";

// import bootstrap spiiner
import { Spinner } from "react-bootstrap";

const MyAccount = () => {
  const { setAlert } = useStateProvider();
  const { user, logout, fetchUser } = useAuth();

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

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // preview image
  const [preview, setPreview] = useState(null);

  // loading image
  const [loading, setLoading] = useState(false);
  console.log(loading, "loading");

  // handle image update
  const handleAvatarChange = async () => {
    setLoading(true);
    try {
      const response = await updateUser(user?.id, {
        photo: preview && preview,
      });
      if (response.status === 200) {
        console.log("Success");
        setAlert({
          type: "success",
          message: "Successfully updated your profile",
        });
        setPreview(null);
        setLoading(false);
        fetchUser();
      }
    } catch (error) {
      console.log(error);
      setAlert({
        type: "danger",
        message: "Something went wrong on server",
      });
    }
  };

  // handle file change
  const handleChange = (e) => {
    const file = e.target.files[0];
    toBase64(file).then((base64) => {
      setPreview(base64);
    });
  };

  // handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
    setAlert({
      type: "success",
      message: "You are browsing in as guest",
    });
  };
 

  return user ? (
    <section className={styles.container}>
      {/* navigation section */}
      <div>
        {!preview ? (
          <div className={styles.profile}>
            <img
              className={styles.avatar}
              // src={`${user?.photo}&${new Date().getTime()}`}
              src={user?.photo}
              alt="profile"
            />
            <label className={styles.editAvatar} htmlFor="image">
              <EditIcon />
            </label>
            {/* image input */}
            <input
              className={styles.imageInput}
              type="file"
              name="image"
              id="image"
              accept="image/x-png"
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className={styles.profile}>
            {loading ? (
              <div className={styles.loading}>
                <Spinner animation="border" />
              </div>
            ) : (
              <img className={styles.avatar} src={preview} alt="profile" />
            )}
            <div className={styles.actions}>
              <button
                className={styles.apply}
                onClick={() => handleAvatarChange()}
              >
                <CheckIcon />
              </button>
              <button
                className={styles.delete}
                onClick={() => setPreview(null)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        )}
        <nav className={`${styles.navigation}`}>
          <button
            className={currentTab === "profile" ? styles.active : ""}
            onClick={() => navigate("/my-account/profile")}
          >
            <ProfileIcon />
            <span>Profile</span>
          </button>
          <button
            className={currentTab === "security" ? styles.active : ""}
            onClick={() => navigate("/my-account/security")}
          >
            <SecurityIcon />
            <span>Login & security</span>
          </button>
          <button
            className={currentTab === "notifications" ? styles.active : ""}
            onClick={() => navigate("/my-account/notifications")}
          >
            <BellIcon />
            <span>Notifications</span>
          </button>
          <button
            className={currentTab === "messages" ? styles.active : ""}
            onClick={() => {
              navigate("/my-account/messages");
            }}
          >
            <ChatIcon />
            <span>Messages</span>
          </button>
          <button onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </button>
        </nav>
      </div>
      {/* main section */}
      <div className={styles.content}>{tabSelector()}</div>
    </section>
  ) : (
    <div>Loading...</div>
  );
};

export default MyAccount;
