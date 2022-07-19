import styles from "./Tabs.module.scss";
import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth";

const Tabs = () => {
  const { user } = useAuth();
  return (
    <div className={styles.tabs}>
      {user?.role === "user" ? (
        <div className={styles.header}>
          <h3 className={styles.welcomeMessage}>
            Welcome back, {user?.fullName}
          </h3>
          <div className={styles.addNewBtn}>
            <Button variant="primary" label="Add new" />
          </div>
        </div>
      ) : null}
      {user?.role === "admin" ? (
        <div>
          <h3 className={styles.welcomeMessage}>
            Welcome back, {user?.fullName}
          </h3>
        </div>
      ) : null}
      {user?.role == null ? (
        <div>
          <h3 className={styles.welcomeMessage}>What are you interested in?</h3>
        </div>
      ) : null}
    </div>
  );
};

export default Tabs;
