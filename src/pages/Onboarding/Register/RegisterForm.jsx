import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import style from "../Authenticate.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { ReactComponent as Google } from "../../../assets/icons/google.svg";
import { ReactComponent as View } from "../../../assets/icons/view.svg";
import { ReactComponent as ViewOff } from "../../../assets/icons/view-off.svg";

import { getUser } from "../../../api/API";

export default function RegisterForm() {
  const navigate = useNavigate();

  const { setAuth } = useAuth();
  const [passwordShown, setPasswordShown] = useState(true);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [pwdError, setPwdError] = useState(null);

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

  const handlePwdError = () => {
    if (pwd.length < 2) {
      setPwdError("Password must be at least 3 chars long");
    } else if (pwd.length > 50) {
      setPwdError("Password must be of maximum 50 chars!");
    } else setPwdError(null);

    if (!pwdError) {
      // No errors.
    }
  };

  const handleSignUp = () => {
    try {
      if (email === "" || pwd === "") {
        handleEmailError();
        handlePwdError();
        return;
      }

      getUser(email).then((res) => setIsLoggedIn(res));
      // should make a validation if a user doesn't exist
      if (isLoggedIn !== null) {
        setAuth({ name: "Team undefined" });
        navigate("/");
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
          <div className={style.formTitle}>
            <h4 className={style.title}>Create account</h4>
            <p className={style.subTitle}>
              Sign up for free and become a member
            </p>
          </div>

          <div className={style.formInput}>
            <Button
              variant="secondary"
              icon={<Google />}
              position="left"
              label="Sign up with Google"
            />
            <div className={style.registerSeparator}>
              <hr />
              <span> OR </span>
              <hr />
            </div>
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
          </div>
        </div>
      </div>

      <div className={style.contentContainerAuthOptions}>
        <div className={`${style.contentContainerButtons} ${style.register}`}>
          <Button
            id="register"
            variant="primary"
            label="Sign up"
            onClick={() => {
              handleSignUp();
            }}
          />
        </div>
        <div
          className={`${style.contentContainerAuthEndForm} ${style.authRegister}`}
        >
          <div className={style.textAuthEndForm}>
            Already have an account?{" "}
            <span
              className={style.textAuthEndForm}
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
