import React from "react";
import popupstyle from "./Popup.module.scss";
const Popup = ({ content }) => {
  return (
    <div className={popupstyle.popupbox}>
      <div className={popupstyle.box}>{content}</div>
    </div>
  );
};

export default Popup;
