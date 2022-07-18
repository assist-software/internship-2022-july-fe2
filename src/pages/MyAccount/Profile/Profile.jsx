import React, { useState, useEffect } from "react";
import { Button, Input } from "../../../components";
import RowItem from "../RowItem/RowItem";
import styles from "./Profile.module.scss";

import useAuth from "../../../hooks/useAuth";
import { updateUser } from "../../../api/API";

import moment from "moment";

const Profile = () => {
  // user data
  const { user } = useAuth();

  // initial form state
  const [activeForm, setActiveForm] = useState("");

  // form values
  const [formValue, setFormValue] = useState({});

  // set user details to formvalue
  useEffect(() => {
    if (user) {
      setFormValue({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
      });
    }
  }, [user]);

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // check errors
  const checkErrors = (field) => {
    if (field === "firstName") {
      if (formValue.firstName.length < 3) {
        return "First name must be at least 3 characters long";
      }
    }
    if (field === "lastName") {
      if (formValue.lastName.length < 3) {
        return "Last name must be at least 3 characters long";
      }
    }
    if (field === "email") {
      if (!formValue.email.includes("@")) {
        return "Email must be valid";
      }
    }
    if (field === "phone") {
      if (formValue.phone.length !== 10) {
        return "Phone must be valid";
      }
    }
    if (field === "address") {
      if (formValue.address.length < 10) {
        return "Address must be at least 10 characters long";
      }
    }
    if (field === "dateOfBirth") {
      if (moment(formValue.dateOfBirth).isAfter(moment())) {
        return "Date of birth must be in the past";
      }
    }
    return "";
  };

  // check if form is valid
  const isFormValid = () => {
    let isValid = true;
    Object.keys(formValue).forEach((field) => {
      if (checkErrors(field)) {
        isValid = false;
      }
    });
    return isValid;
  };

  // handleSubmit
  const handleSubmit = async () => {
    if (isFormValid()) {
      try {
        const response = await updateUser(formValue);
        console.log(response, "response");
        if (response.status === 200) {
          console.log("updated");
          setActiveForm("");
        }
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      console.log("Form has error");
    }
  };

  return (
    <div>
      <h4 className={styles.title}>Profile</h4>
      {/* full name */}
      <RowItem
        title="Full name"
        info={
          (formValue?.firstName + " " + formValue?.lastName).trim() || "Not set"
        }
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
            value={formValue.firstName}
            name="firstName"
            id="firstName"
            type="text"
            label="First name"
            helper={checkErrors("firstName")}
            error={checkErrors("firstName") ? true : false}
          />

          {/* lastName */}
          <Input
            onChange={handleChange}
            value={formValue.lastName}
            name="lastName"
            id="lastName"
            type="text"
            label="Last name"
            helper={checkErrors("lastName")}
            error={checkErrors("lastName") ? true : false}
          />

          {/* disabled if no changes has made */}
          <Button
            disabled={isFormValid() ? false : true}
            onClick={handleSubmit}
            label="Save"
          />
        </div>
      )}

      {/* gender */}
      <RowItem
        action="Edit"
        active={activeForm === "gender" ? true : false}
        info={formValue?.gender || "Not set"}
        onAction={() => setActiveForm("gender")}
        onCancel={() => {
          setActiveForm("");
        }}
        title="Gender"
      />
      {activeForm === "gender" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            value={formValue.gender}
            name="gender"
            id="gender"
            type="text"
            label="Gender"
            helper={checkErrors("gender")}
            error={checkErrors("gender") ? true : false}
          />
          <Button
            disabled={isFormValid() ? false : true}
            onClick={handleSubmit}
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
        info={formValue?.dateOfBirth || "Not set"}
        action="Edit"
      />
      {activeForm === "birthday" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            value={moment(formValue.dateOfBirth).format("YYYY-MM-DD")}
            // value="2022-05-25"
            name="dateOfBirth"
            id="dateOfBirth"
            type="date"
            label="Birthday"
          />
          <Button
            onClick={() => {
              setActiveForm("");
              handleSubmit();
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
        info={formValue?.email || "Not set"}
        action="Edit"
      />
      {activeForm === "email" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            value={formValue.email}
            name="email"
            id="email"
            type="text"
            label="Email"
          />
          <Button
            onClick={() => {
              setActiveForm("");
              handleSubmit();
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
        info={formValue?.phone || "Not set"}
        action="Edit"
      />
      {activeForm === "phone" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            value={formValue.phone}
            name="phone"
            id="phone"
            type="text"
            label="Phone"
          />
          <Button
            onClick={() => {
              setActiveForm("");
              handleSubmit();
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
        info={formValue?.address || "Not set"}
        action="Edit"
      />
      {activeForm === "address" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            value={formValue.address}
            name="address"
            id="address"
            type="text"
            label="Address"
          />
          <Button
            onClick={() => {
              setActiveForm("");
              handleSubmit();
            }}
            label="Save"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
