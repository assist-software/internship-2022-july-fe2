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

export default function LoginForm() {
  const navigate = useNavigate();

  const { setAuth } = useAuth();
  const [passwordShown, setPasswordShown] = useState(true);
  const [user, setUser] = useState("");
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
    if (!validateEmail(user)) {
      setEmailError("Invalid e-mail address!");
    } else setEmailError(null);
    if (!emailError) {
      // No errors.
    }
  };

  const handlePwdError = () => {
    if (pwd.length < 3) {
      setPwdError("Password must be at least 3 chars long");
    } else if (pwd.length > 50) {
      setPwdError("Password must be of maximum 50 chars!");
    } else setPwdError(null);

    if (!pwdError) {
      // No errors.
    }
  };

  const handleLogIn = () => {
    try {
      if (user === "" || pwd === "") {
        handleEmailError();
        handlePwdError();
        return;
      }

      getUser(user).then((res) => setIsLoggedIn(res));
      // should make a validation if a user doesn't exist
      if (isLoggedIn !== null) {
        setAuth({ name: "Team undefined" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(isLoggedIn + " =-----=");

  const passToggleHandler = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={style.containerAuth}>
      <div className={style.contentContainerForm}>
        <div className={style.form}>
          <div className={style.formTitle}>
            <h4 className={style.title}>Log in</h4>
            <p className={style.subTitle}>Enter your account details below.</p>
          </div>

          <div className={style.formInput}>
            {emailError && <div className={style.authError}>{emailError}</div>}
            <Input
              label="Email"
              id="email"
              name="email"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
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
          </div>
        </div>

        <div className={style.rememberMe}>
          <div className={style.checkBox}>
            <Input type="checkbox" label="" />
            <p className={style.textRememberMe}>Remember me</p>
          </div>

          <div className={style.forgotPassword}>
            <a
              className={style.textForgotPassword}
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>

      <div className={style.contentContainerAuthOptions}>
        <div className={style.contentContainerButtons}>
          <Button
            variant="primary"
            label="Log in"
            onClick={() => {
              handleLogIn();
              // setAuth({ name: "Team undefined" });
              // //<Navigate to="/" state={{ from: location }} replace />;
              // navigate("/");
            }}
          />

          <Button
            variant="secondary"
            icon={<Google />}
            position="left"
            label="Log in with Google"
          />
        </div>
        <div className={style.contentContainerAuthEndForm}>
          <p className={style.textAuthEndForm}>
            Don't have an account?{" "}
            <a
              className={style.textAuthEndForm}
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
