import React, { useState } from "react";
import { Button, Input } from "../../../components";
import RowItem from "../RowItem/RowItem";
import styles from "./Security.module.scss";

import { updatePassword, deactivateUser } from "../../../api/API";
import useAuth from "../../../hooks/useAuth";
import useStateProvider from "../../../hooks/useStateProvider";

import moment from "moment";

import { useNavigate } from "react-router-dom";

const Security = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const { user } = useAuth();
  const { setAlert } = useStateProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "oldPassword":
        setOldPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    setIsShow("");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowErrors(false);
  };

  // isFormValid
  const isFormValid = (field) => {
    // oldPassword
    if (field === "oldPassword") {
      if (oldPassword.length > 7) {
        return true;
      }
    }

    // newPassword
    if (field === "newPassword") {
      if (newPassword.length > 7) {
        return true;
      }
    }

    // confirmPassword
    if (field === "confirmPassword") {
      if (confirmPassword.length > 7) {
        return true;
      }
    }

    // oldPassword and newPassword
    if (field === "match") {
      if (newPassword === confirmPassword) {
        return true;
      }
    }

    // all
    if (field === "all") {
      if (
        oldPassword.length > 7 &&
        newPassword.length > 7 &&
        confirmPassword.length > 7 &&
        newPassword === confirmPassword
      ) {
        return true;
      }
    }

    return false;
  };

  // handle reset
  const handleResetPassword = async (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isFormValid(field)) {
      setShowErrors(true);
      console.log(showErrors);
      return;
    } else {
      try {
        const response = await updatePassword(user.id, {
          oldPassword,
          newPassword,
        });
        if (response.status === 200) {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setIsShow("");
          setAlert({
            type: "success",
            message: "Password is updated",
          });
        }
      } catch (error) {
        console.log(error);
        setAlert({
          type: "warning",
          message: "Old password is wrong",
        });
      }
    }
  };

  // handle deactivate
  const handleDeactivate = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await deactivateUser(user.id);
      if (response.status === 200) {
        setAlert({
          type: "success",
          message: "Your account is deactivated",
        });
        setTimeout(() => {
          localStorage.clear();
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setAlert({
        type: "danger",
        message: "Something went wrong on server",
      });
    }
  };

  return (
    <div>
      <h4 className={styles.title}>Login & Security</h4>
      {/* password */}
      <RowItem
        title="Password"
        //
        info={`Last updated ${moment(user?.updatedAt).fromNow()}`}
        action="Update"
        active={isShow === "resetPassword"}
        onAction={() => setIsShow("resetPassword")}
        onCancel={handleCancel}
      />

      {isShow === "resetPassword" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            name="oldPassword"
            value={oldPassword}
            label="Old password"
            error={showErrors && !isFormValid("oldPassword")}
            helper={
              showErrors && !isFormValid("oldPassword")
                ? "Password must be at least 7 characters"
                : ""
            }
          />
          <Input
            onChange={handleChange}
            name="newPassword"
            value={newPassword}
            label="New password"
            error={showErrors && !isFormValid("newPassword")}
            helper={
              showErrors && !isFormValid("newPassword")
                ? "Password must be at least 7 characters"
                : ""
            }
          />
          <Input
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
            label="Confirm new password"
            error={showErrors && !isFormValid("match")}
            helper={`${
              showErrors && !isFormValid("confirmPassword")
                ? "Password must be at least 7 characters"
                : ""
            } ${
              showErrors && !isFormValid("match") ? "Password must match" : ""
            }`}
          />
          <Button
            onClick={(e) => handleResetPassword(e, "all")}
            label="Update password"
          />
        </div>
      )}

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
      <RowItem
        info="Deactivate your account"
        action="Deactivate"
        onAction={() => setIsShow("deactivate")}
        onCancel={handleCancel}
        active={isShow === "deactivate"}
      />
      {isShow === "deactivate" && (
        <div className={styles.deactivate}>
          <h5>Are you sure?</h5>
          <p>
            You can activate your account again at any time by logging in to
            your account.
          </p>
          <Button
            onClick={handleDeactivate}
            variant="destructive"
            label="Deactivate"
          />
        </div>
      )}
    </div>
  );
};

export default Security;
