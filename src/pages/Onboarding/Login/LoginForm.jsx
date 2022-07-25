import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import style from "../Authenticate.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import { ReactComponent as Google } from "../../../assets/icons/google.svg";
import { ReactComponent as View } from "../../../assets/icons/view.svg";
import { ReactComponent as ViewOff } from "../../../assets/icons/view-off.svg";

import useAuth from "../../../hooks/useAuth";
import useStateProvider from "../../../hooks/useStateProvider";

import { login } from "../../../api/API";

// import { getUserById } from "../../../api/API";

export default function LoginForm() {
  const { setUser, setUserId } = useAuth();

  const { setAlert } = useStateProvider();

  const navigate = useNavigate();

  // const { setUser } = useAuth();
  const [passwordShown, setPasswordShown] = useState(true);

  // form values
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  // error states
  const [emailError, setEmailError] = useState(null);
  const [pwdError, setPwdError] = useState(null);

  const handleEmailError = (e) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(e) === false) {
      setEmailError("Invalid e-mail address!");
    } else {
      setEmailError("");
    }
  };

  const handlePwdError = (e) => {
    if (e.length < 8) {
      setPwdError("Password must be at least 8 chars long");
    } else setPwdError("");
  };

  const handleLogin = async () => {
    try {
      if (emailError === "" && pwdError === "") {
        if (pwd.length > 7) {
          //setUser()
          const response = await login(email, pwd);
          if (response.status === 200) {
            setUser(response.data);
            console.log(response.data, "user json");
            navigate("/");
            localStorage.setItem("token", "response?.data.token");
            localStorage.setItem("userId", response?.data.id);
            setUserId(response?.data.id);
            console.log(response?.data.id, "userid");
            setAlert({
              type: "success",
              message: "Login successfully",
            });
          }
        }
      } else {
        if (emailError !== "") handleEmailError("");
        if (pwdError !== "") handlePwdError("");
        setAlert({
          type: "danger",
          message: "Fill all the required fields correctly.",
        });
      }
    } catch (error) {
      console.log(error, "error");
      setAlert({
        type: "danger",
        message: "Something went wrong! Check your credentials",
      });
    }
  };

  const passToggleHandler = () => {
    setPasswordShown(!passwordShown);
  };
  const resp = [
    {
      id: "9f244a73-8105-4bd8-6893-08da6d50a9d6",
      fullName: "Andrei Andries",
      gender: 0,
      date_of_birth: "",
      email: "andrei@1.com",
      password: "useruser",
      token: "secret",
      phone: "string",
      address: "string",
      role: 1,
      photo:
        "https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=",
      isActive: "",
    },
  ];

  // test login handlers
  const handleTestLoginUser = () => {
    try {
      localStorage.setItem("token", resp.token);
      localStorage.setItem("role", resp.role);
      localStorage.setItem("userId", resp.id);
      setUser({
        email: resp.email,
        parola: resp.parola,
        id: resp.id,
        role: resp.role,
        token: resp.token,
        fullName: resp.name,
        photo: resp.photo,
      });
      navigate("/");
      // fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTestLoginAdmin = () => {
    try {
      localStorage.setItem("token", resp.token);
      localStorage.setItem("role", resp.role);
      localStorage.setItem("userId", resp.id);
      setUser({
        email: resp.email,
        parola: resp.parola,
        id: resp.id,
        role: resp.role,
        token: resp.token,
        fullName: resp.name,
        photo: resp.photo,
      });
      navigate("/");
      window.location.reload();
      // fetchUser();
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
                handleEmailError(e.target.value);
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
                handlePwdError(e.target.value);
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
            Don't have an account?{" "}
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
