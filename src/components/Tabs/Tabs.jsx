import styles from "./Tabs.module.scss";
import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";

const Tabs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setPreview } = useStateProvider();
  return (
    <div className={styles.tabs}>
      {user?.role === 0 ? (
        <div className={styles.header}>
          <h3 className={styles.welcomeMessage}>
            Welcome back, {user?.fullName}
          </h3>
          <div className={styles.addNewBtn}>
            <Button
              onClick={() => {
                setPreview({});
                navigate("/add");
              }}
              variant="primary"
              label="Add new"
            />
          </div>
        </div>
      ) : null}
      {user?.role === 1 ? (
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
