import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import useStateProvider from "../../../hooks/useStateProvider";
import style from "../Authenticate.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import { ReactComponent as Google } from "../../../assets/icons/google.svg";
import { ReactComponent as View } from "../../../assets/icons/view.svg";
import { ReactComponent as ViewOff } from "../../../assets/icons/view-off.svg";

import { register } from "../../../api/API";

export default function RegisterForm() {
  const navigate = useNavigate();

  const { setAlert } = useStateProvider();

  const [passwordShown, setPasswordShown] = useState(true);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwdError, setPwdError] = useState("");

  const handleEmailError = () => {
    if (!email.includes("@")) {
      setEmailError("Invalid e-mail address!");
    } else {
      setEmailError("");
    }
  };

  const handlePwdError = () => {
    if (pwd.length < 7) {
      setPwdError("Password must be at least 8 chars long");
    } else {
      setPwdError("");
    }
  };

  const passToggleHandler = () => {
    setPasswordShown(!passwordShown);
  };

  // handle register
  const handleRegister = async () => {
    try {
      //
      handleEmailError();
      handlePwdError();
      if (emailError === "" && pwdError === "" && pwd.length > 7) {
        const response = await register(email, pwd);
        if (response.status === 200) {
          navigate("/login");
          setAlert({
            type: "success",
            message: "Account created successfully",
          });
        }
      } else {
        if (emailError !== "") handleEmailError();
        if (pwdError !== "") handlePwdError();
        setAlert({
          type: "danger",
          message: "Fill all the required fields correctly.",
        });
      }
    } catch (error) {
      console.log(error, "error");
      setAlert({
        type: "danger",
        message: "Something went wrong",
      });
    }
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
                handlePwdError(e);
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
            onClick={handleRegister}
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
