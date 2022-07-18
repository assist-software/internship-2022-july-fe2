import React from "react";
import Dropdown from "../../components/Dropdown/Dropdown";

const Sabin = () => {
  return (
    <div>
      <div style={{ width: "160px" }}>
        <Dropdown fontWeight="bold" fontSize="buton" />
      </div>
      <Dropdown fontWeight="bold" fontSize="buton" multi title="Location" />
    </div>
  );
};

export default Sabin;
