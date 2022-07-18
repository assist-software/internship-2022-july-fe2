import React, { useState, useEffect } from "react";
import { Button, Input } from "../../../components";
import RowItem from "../RowItem/RowItem";
import styles from "./Profile.module.scss";
import { getUserById } from "../../../api/API";

const Profile = () => {
  // get user from API
  useEffect(() => {
    (async () => {
      try {
        const response = await getUserById(1);
        setUser(response);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, []);

  // initial states
  const [activeForm, setActiveForm] = useState("");
  const [user, setUser] = useState({});

  // form values
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
  });

  const { lastName, firstName, gender, dateOfBirth, email, phone, address } =
    formValue;

  // set user data to forms
  useEffect(() => {
    if (user) {
      // setFormValue.firstName(user?.fullName || "");
      setFormValue({ lastName: user?.fullName } || "");
      setFormValue({ gender: user?.gender } || "");
      setFormValue({ dateOfBirth: user?.dateOfBirth } || "");
      setFormValue({ email: user?.email } || "");
      setFormValue({ phone: user?.phone } || "");
      setFormValue({ address: user?.address } || "");
    }
  }, [user]);

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div>
      <h4 className={styles.title}>Profile</h4>
      {/* name */}
      <RowItem
        title="Full name"
        info={user.fullName}
        action="Edit"
        active={activeForm === "name" ? true : false}
        onCancel={() => {
          setActiveForm("");
        }}
        onAction={() => {
          setActiveForm("name");
        }}
      />
      {activeForm === "name" && (
        <div className={styles.form}>
          {/* firstName */}
          <Input
            onChange={handleChange}
            value={formValue.email}
            name="firstName"
            id="firstName"
            type="text"
            label="First name"
          />

          {/* lastName */}
          <Input
            onChange={handleChange}
            value={lastName}
            name="lastName"
            id="lastName"
            type="text"
            label="Last name"
          />

          <Button
            onClick={() => {
              setActiveForm("");
            }}
            label="Save"
          />
        </div>
      )}

      {/* gender */}
      <RowItem
        name="firstName"
        id="firstName"
        action="Edit"
        active={activeForm === "gender" ? true : false}
        info="Male"
        onAction={() => setActiveForm("gender")}
        onCancel={() => {
          setActiveForm("");
        }}
        title="Gender"
      />
      {activeForm === "gender" && (
        <div className={styles.form}>
          <Input onChange={handleChange} value={gender} label="Gender" />
          <Button
            onClick={() => {
              setActiveForm("");
            }}
            label="Save"
          />
        </div>
      )}

      {/* birthday */}
      <RowItem
        active={activeForm === "birthday" ? true : false}
        onAction={() => setActiveForm("birthday")}
        onCancel={() => {
          setActiveForm("");
        }}
        title="Date of birth"
        info="05.05.2000"
        action="Edit"
      />
      {activeForm === "birthday" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            name="dateOfBirth"
            id="dateOfBirth"
            value={dateOfBirth}
            label="Birthday"
          />
          <Button
            onClick={() => {
              setActiveForm("");
            }}
            label="Save"
          />
        </div>
      )}

      {/* email */}
      <RowItem
        active={activeForm === "email" ? true : false}
        onAction={() => setActiveForm("email")}
        onCancel={() => {
          setActiveForm("");
        }}
        title="Email address"
        info="james.milner@example.com"
        action="Edit"
      />
      {activeForm === "email" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            name="email"
            id="email"
            value={email}
            label="Email"
          />
          <Button
            onClick={() => {
              setActiveForm("");
            }}
            label="Save"
          />
        </div>
      )}
      {/* phone */}
      <RowItem
        active={activeForm === "phone" ? true : false}
        onAction={() => setActiveForm("phone")}
        onCancel={() => {
          setActiveForm("");
        }}
        title="Phone number"
        info="123456789"
        action="Edit"
      />
      {activeForm === "phone" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            name="phone"
            id="phone"
            value={phone}
            label="Phone"
          />
          <Button
            onClick={() => {
              setActiveForm("");
            }}
            label="Save"
          />
        </div>
      )}
      <RowItem
        active={activeForm === "address" ? true : false}
        onAction={() => setActiveForm("address")}
        onCancel={() => {
          setActiveForm("");
        }}
        title="Address"
        info="Not provided"
        action="Edit"
      />
      {activeForm === "address" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            name="address"
            id="address"
            value={address}
            label="Address"
          />
          <Button
            onClick={() => {
              setActiveForm("");
            }}
            label="Save"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
