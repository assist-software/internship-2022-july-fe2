import React from "react";
import Button from "../../components/Button/Button";

const Selim = () => {
  return (
    <div
      style={{
        width: "20rem",
      }}
    >
      <h1>Regular</h1>
      <Button variant="primary" label="Button" />
      <Button variant="secondary" label="Button" />
      <Button variant="tertiary" label="Button" />
      <Button variant="destructive" label="Button" />

      <h2>Disabled</h2>
      <Button disabled variant="primary" label="Button" />
      <Button disabled variant="secondary" label="Button" />
      <Button disabled variant="tertiary" label="Button" />
      <Button disabled variant="destructive" label="Button" />

      <h1>icon</h1>
      <Button position="right" variant="primary" label="Button" />
      <Button position="right" variant="secondary" label="Button" />
      <Button position="left" variant="tertiary" label="Button" />
      <Button position="left" variant="destructive" label="Button" />

      <h1>default</h1>
      <Button />
      <Button />
      <Button />
      <Button />
    </div>
  );
};

export default Selim;
