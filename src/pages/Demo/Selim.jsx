import React, { useState, useEffect } from "react";
import { Button, Input } from "../../components";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";
import { getListings } from "../../api/API";

const Selim = () => {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    getListings().then((res) => setListings(res));
  }, []);

  console.log(listings);
  return (
    <div
      style={{
        width: "20rem",
      }}
    >
      <h1>Buttons</h1>
      <Button variant="primary" label="Button" />
      <Button variant="secondary" label="Button" />
      <Button variant="tertiary" label="Button" />
      <Button variant="destructive" label="Button" />
      <Button position="right" variant="secondary" label="Button" />
      <h1>Inputs</h1>
      <Input icon={<Heart />} error />
      <Input icon={<Heart />} label="Label" />
      <Input error helper="afdas" icon={<Heart />} disabled label="Label" />
    </div>
  );
};

export default Selim;
