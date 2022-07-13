import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ul className={styles.list}>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/my-account")}>MyAccount</li>
        <li onClick={() => navigate("/listing")}>Listing</li>
        <li onClick={() => navigate("/login")}>Onboarding</li>
        <li onClick={() => navigate("/favorites")}>Favorites</li>
        <li onClick={() => navigate("/confirmation")}>Confirmation</li>
        <li onClick={() => navigate("/add")}>AddEdit</li>
        <li onClick={() => navigate("/edit")}>AddEdit</li>
      </ul>
    </div>
  );
};

export default Header;
