import React from "react";
import RowItem from "../RowItem/RowItem";
import styles from "./Security.module.scss";

const Security = () => {
  return (
    <div>
      <h4 className={styles.title}>Login & Security</h4>
      {/* password */}
      <RowItem
        title="Password"
        info="Last updated 3 weeks ago"
        action="Update"
      />
      {/* social accounts */}
      <h5 className={styles.subtitle}>Login & Security</h5>
      <RowItem title="Facebook" info="Not connected" action="Connect" />
      <RowItem title="Google" info="Connected" action="Disonnect" />

      {/* recent login activity */}
      <h5 className={styles.subtitle}>Recent login activity</h5>
      <RowItem
        title="Windows 10 - Chrome"
        info="Suceava, SV - 25.05.2022 at 13:44"
        action="Log out device"
      />
      <RowItem
        title="IOS 15.2 - Chrome"
        info="Suceava, SV - 25.05.2022 at 13:44"
        action="Log out device"
      />

      {/* account */}
      <h5 className={styles.subtitle}>Account</h5>
      <RowItem info="Deactivate your account" action="Connect" />
    </div>
  );
};

export default Security;
