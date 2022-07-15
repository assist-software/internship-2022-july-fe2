import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import style from "../Authenticate.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import { getUser } from "../../../api/API";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState(null);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const handleEmailError = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid e-mail address!");
    } else setEmailError(null);
    if (!emailError) {
      // No errors.
    }
  };

  const handleSendLink = () => {
    try {
      if (email === "") {
        handleEmailError();
        return;
      }

      getUser(email).then((res) => setIsLoggedIn(res));
      // should make a validation if a user doesn't exist
      if (isLoggedIn !== null) {
        setAuth({ name: "Team undefined" });
        navigate("/reset-password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.containerAuthResetPwd}>
      <div className={style.contentContainerFormResetPwd}>
        <div className={style.form}>
          <div className={style.formTitleReset}>
            <h4 className={style.title}>Forgot password</h4>
            <p className={style.subTitle}>
              Password reset link sent to your email address
            </p>
          </div>

          <div className={style.formInput}>
            {emailError && <div className={style.authError}>{emailError}</div>}
            <Input
              label="Email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleEmailError();
              }}
              type="email"
              placeholder={"Email"}
              required
            />
          </div>
        </div>
      </div>

      <div className={style.contentContainerAuthOptions}>
        <div className={`${style.contentContainerButtons} ${style.reset}`}>
          <Button
            id="register"
            variant="primary"
            label="Send reset link"
            onClick={() => {
              handleSendLink();
            }}
          />
        </div>
        <div className={style.contentContainerAuthEndForm}>
          <div className={style.textAuthEndForm}>
            <span
              onClick={() => {
                navigate("/login");
              }}
            >
              Back to Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
