import React from "react";

import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import style from "./LoginForm.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { ReactComponent as Google } from "../../../assets/icons/google.svg";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  return (
    <div className={style.containerLogin}>
      <div className={style.contentContainerForm}>
        <div classname={style.form}>
          <div className={style.formTitle}>
            <h4 className={style.title}>Log in</h4>
            <p className={style.subTitle}>Enter your account details below.</p>
          </div>

          <div className={style.formInput}>
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
          </div>
        </div>

        <div className={style.rememberMe}>
          <div className={style.checkBox}>
            {/* <input type="checkbox" className={style.inpCheckbox} /> */}

            <Input type="checkbox" label="" />

            <p className={style.textRememberMe}>Remember me</p>
          </div>

          <div className={style.forgotPassword}>
            <button
              className={style.textForgotPassword}
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>

      <div className={style.contentContainerLoginOptions}>
        <Button
          variant="primary"
          label="Log in"
          onClick={() => {
            setAuth({ name: "Team undefined" });
            //<Navigate to="/" state={{ from: location }} replace />;
            navigate("/");
          }}
        />

        <Button
          variant="secondary"
          icon={<Google />}
          position="left"
          label="Log in with Google"
        />
      </div>
    </div>
  );
}
