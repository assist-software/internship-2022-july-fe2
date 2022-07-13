import React from "react";
<<<<<<< HEAD
import Button from "../../components/Button/Button";

const Selim = () => {
  return (
    <div>
      <Button />
=======
import { Button, Input } from "../../components";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";

const Selim = () => {
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
      <Input label="Label" />
      <Input disabled label="Label" />
>>>>>>> development
    </div>
  );
};

export default Selim;
