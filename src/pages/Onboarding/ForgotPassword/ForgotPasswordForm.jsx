import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import style from "../Authenticate.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import { forgotpwd } from "../../../api/API";
import useStateProvider from "../../../hooks/useStateProvider";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  // const { setUser } = useAuth();

  const [email, setEmail] = useState("");

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState(null);

  const { setAlert } = useStateProvider();

  const handleEmailError = () => {
    if (!email.includes("@")) {
      setEmailError("Invalid e-mail address!");
    } else {
      setEmailError("");
    }
  };

  // const handleSendLink = () => {
  //   try {
  //     if (email === "") {
  //       handleEmailError();
  //       return;
  //     }

  //     getUserById(email).then((res) => setIsLoggedIn(res));
  //     // should make a validation if a user doesn't exist
  //     if (isLoggedIn !== null) {
  //       setUser({ name: "Team undefined" });
  //       navigate("/reset-password");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleForgotPwd = async () => {
    try {
      if (emailError === "") {
        const response = await forgotpwd(email);
        if (response.status === 200) {
          // setUser(response.data);
          navigate("/login");
          setAlert({
            type: "success",
            message: "You will receive an email.",
          });
        } else {
          setAlert({
            type: "danger",
            message: "Something went wrong! Check your email.",
          });
        }
      } else {
        if (emailError !== "") handleEmailError();
        setAlert({
          type: "danger",
          message: "Fill the email field!",
        });
      }
    } catch (error) {
      console.log(error, "error");
      setAlert({
        type: "danger",
        message: "Something went wrong! Check your email.",
      });
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
              handleForgotPwd();
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
