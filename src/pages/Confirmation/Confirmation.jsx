import React from "react";
import styles from "./Confirmation.module.scss";
import welcome from "../../assets/images/welcome.png";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.confirmation}>
      <img src={welcome} alt="Confirmed" />
      <h5 className={styles.confirmationTitle}>
        Awesome! Your listing has been sent for approval.
      </h5>
      <p className={styles.paragraph}>
        Admins will check your listing to make sure everything is okay.
      </p>
      <div className={styles.button}>
        <Button
          variant={"primary"}
          label="Home"
          onClick={() => navigate("/")}
        />
      </div>

      <div className={styles.button}>
        <Button
          variant={"secondary"}
          label="Add new listing"
          onClick={() => navigate("/add")}
        />
      </div>
    </div>
  );
};

export default Confirmation;
