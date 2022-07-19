import React from "react";
import { useLocation } from "react-router-dom";
import AssistLogo from "../../assets/images/logo-assist-tagline.png";
import LoginImage from "../../assets/images/splash.png";
import style from "./Onboarding.module.scss";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";
import ForgotPasswordForm from "./ForgotPassword/ForgotPasswordForm";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";

const Onboarding = () => {
  const location = useLocation().pathname;
  return (
    <div className={style.mainContainer}>
      {/* <div className={style.container}> */}
      <div className={style.leftSide}>
        <div className={style.contentContainer}>
          <img
            src={AssistLogo}
            className={style.logoImageOnboarding}
            alt="Login Logo"
          />
          <br />
          <br />

          {location === "/login" && <LoginForm />}
          {location === "/register" && <RegisterForm />}
          {location === "/forgot-password" && <ForgotPasswordForm />}
          {location === "/reset-password" && <ResetPasswordForm />}
        </div>
      </div>
      {/* End leftSide */}
      {/* <div className={style.rightSide}> */}
      <img
        src={LoginImage}
        className={style.rightImageOnboarding}
        alt="Login"
      />
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default Onboarding;
