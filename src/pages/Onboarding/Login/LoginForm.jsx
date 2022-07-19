import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";
import style from "../Authenticate.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import { ReactComponent as Google } from "../../../assets/icons/google.svg";
import { ReactComponent as View } from "../../../assets/icons/view.svg";
import { ReactComponent as ViewOff } from "../../../assets/icons/view-off.svg";
import { getUserById } from "../../../api/API";

// import { getUserById } from "../../../api/API";

export default function LoginForm() {
  const navigate = useNavigate();

  // const { setUser } = useAuth();
  const [passwordShown, setPasswordShown] = useState(true);

  // form values
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  console.log(email, pwd, "inputs");

  // error states
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    if (pwd.length < 3) {
      setPwdError("Password must be at least 3 chars long");
    } else if (pwd.length > 50) {
      setPwdError("Password must be of maximum 50 chars!");
    } else setPwdError(null);

    if (!pwdError) {
      // No errors.
    }
  };

  // const handleLogIn = () => {
  //   try {
  //     if (email === "" || pwd === "") {
  //       handleEmailError();
  //       handlePwdError();
  //       return;
  //     }

  //     getUserById(email).then((res) => setIsLoggedIn(res));
  //     // should make a validation if a email doesn't exist
  //     if (isLoggedIn !== null) {
  //       setUser({ name: "Team undefined" });
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const passToggleHandler = () => {
    setPasswordShown(!passwordShown);
  };

  // test login handlers
  const handleTestLoginUser = () => {
    const token = 1234;
    const role = "user";
    const id = 2;

    try {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleTestLoginAdmin = () => {
    const token = 1234;
    const role = "admin";
    const id = 1;
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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
            {/* email */}
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

            {/* password */}
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
            <span
              className={style.textForgotPassword}
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot your password?
            </span>
          </div>
        </div>
      </div>

      <div className={style.contentContainerAuthOptions}>
        <div className={style.contentContainerButtons}>
          <Button
            variant="primary"
            label="Log in"
            onClick={handleTestLoginUser}
          />

          <Button
            variant="secondary"
            icon={<Google />}
            position="left"
            label="Log in with Google"
            onClick={handleTestLoginAdmin}
          />
        </div>
        <div className={style.contentContainerAuthEndForm}>
          <p className={style.textAuthEndForm}>
            Don't have an account?
            <span
              className={style.textAuthEndForm}
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
