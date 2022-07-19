import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import style from "../Authenticate.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { ReactComponent as View } from "../../../assets/icons/view.svg";
import { ReactComponent as ViewOff } from "../../../assets/icons/view-off.svg";

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const [passwordShown, setPasswordShown] = useState(true);

  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [pwdError, setPwdError] = useState(null);

  const handlePwdError = () => {
    if (pwd.length < 7) {
      setPwdError("Password must be at least 8 chars long");
    } else if (pwd.length > 50) {
      setPwdError("Password must be of maximum 50 chars!");
    } else setPwdError(null);

    if (!pwdError) {
      // No errors.
    }
  };

  const handlePwdConfirmError = () => {
    if (pwd !== pwdConfirm) {
      setPwdError("Passwords does not match!");
      return -1;
    } else setPwdError(null);

    if (!pwdError) {
      // No errors.
    }
  };

  const handleReset = () => {
    try {
      if (pwd === "") {
        handlePwdError();
        return;
      }
      if (pwdConfirm === "") {
        handlePwdConfirmError();
        return;
      }
      if (pwd !== "" && pwdConfirm !== "")
        if (handlePwdConfirmError() !== -1) {
          // getUserById(email).then((res) => setIsLoggedIn(res);
          setIsLoggedIn(true);

          // should make a validation if a user doesn't exist
          if (isLoggedIn !== null) {
            setUser({ name: "Team undefined" });
            navigate("/");
          }
        }
    } catch (error) {
      console.log(error);
    }
  };

  const passToggleHandler = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={style.containerAuth}>
      <div className={style.contentContainerForm}>
        <div className={style.form}>
          <div className={style.formTitleReset}>
            <h4 className={style.title}>Reset password</h4>
            <p className={style.subTitle}>
              Create a new password for your account
            </p>
          </div>

          <div className={style.formInput}>
            {pwdError && <div className={style.authError}>{pwdError}</div>}
            <Input
              label="Password"
              id="password"
              name="password"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
                handlePwdError();
              }}
              type={passwordShown ? "password" : "text"}
              placeholder={"Password"}
              icon={passwordShown ? <View /> : <ViewOff />}
              onIconClick={passToggleHandler}
              required
            />
            <span className={style.textpwdInfo}>
              At least 8 characters and one number.
            </span>

            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              value={pwdConfirm}
              onChange={(e) => {
                setPwdConfirm(e.target.value);
                // handlePwdConfirmError();
              }}
              type={passwordShown ? "password" : "text"}
              placeholder={"Password"}
              icon={passwordShown ? <View /> : <ViewOff />}
              onIconClick={passToggleHandler}
              required
            />
          </div>
        </div>
      </div>

      <div className={style.contentContainerAuthOptions}>
        <div className={`${style.contentContainerButtons} ${style.register}`}>
          <Button
            id="register"
            variant="primary"
            label="Confirm password"
            onClick={() => {
              handleReset();
            }}
          />
        </div>
      </div>
    </div>
  );
}
