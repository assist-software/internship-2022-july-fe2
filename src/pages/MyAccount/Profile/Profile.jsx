import React, { useState, useEffect } from "react";
import { Button, Input } from "../../../components";
import RowItem from "../RowItem/RowItem";
import styles from "./Profile.module.scss";

import useAuth from "../../../hooks/useAuth";
import useStateProvider from "../../../hooks/useStateProvider";

import { updateUser } from "../../../api/API";

import moment from "moment";
import Select from "../../../components/Select/Select";

const Profile = () => {
  // global states
  const { user, fetchUser, setUser } = useAuth();

  // state provider
  const { setAlert } = useStateProvider();

  // refetch trigger
  const [refetch, setRefetch] = useState(false);

  // active form
  const [activeForm, setActiveForm] = useState("");

  // state for full name
  const [fullName, setFullName] = useState({
    firstName: user?.fullName?.split(" ")[0] || "",
    lastName: user?.fullName?.split(" ")[1] || "",
  });

  // set full name on user change
  useEffect(() => {
    setFullName({
      firstName: user?.fullName?.split(" ")[0] || "",
      lastName: user?.fullName?.split(" ")[1] || "",
    });
  }, [user]);

  // form data
  const [formValue, setFormValue] = useState({
    id: "",
    fullName: `${fullName.firstName} ${fullName.lastName}`,
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
  });

  // refetch user data
  useEffect(() => {
    if (refetch) {
      fetchUser();
      setRefetch(false);
    }
  }, [fetchUser, refetch]);

  // set user details to formvalue on user or full name change
  useEffect(() => {
    if (user) {
      setFormValue({
        id: user.id,
        fullName: `${fullName.firstName} ${fullName.lastName}`,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
      });
    }
  }, [user, fullName]);

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  // handleCancel
  const handleCancel = () => {
    setActiveForm("");

    // form inital value
    setFormValue({
      id: "",
      fullName: `${fullName.firstName} ${fullName.lastName}`,
      email: user.email,
      phone: user.phone,
      address: user.address,
      gender: user.gender,
    });

    setFullName({
      firstName: user?.fullName?.split(" ")[0] || "",
      lastName: user?.fullName?.split(" ")[1] || "",
    });
  };

  // isFormValid
  const isFormValid = (field) => {
    // name
    if (field === "fullName") {
      if (fullName?.firstName?.length > 2 && fullName?.lastName?.length > 2) {
        return true;
      }
    }
    // firstname
    if (field === "firstName") {
      if (fullName?.firstName?.length > 2) {
        return true;
      }
    }
    // lastName
    if (field === "lastName") {
      if (fullName?.lastName?.length > 2) {
        return true;
      }
    }
    // gender
    if (field === "gender") {
      if (
        formValue[field] === "" ||
        formValue[field] === "Male" ||
        formValue[field] === "Female" ||
        formValue[field] === "Other"
      ) {
        return true;
      }
    }
    // birthdate
    if (field === "dateOfBirth") {
      // must be at least 18 years old
      if (moment().diff(moment(formValue[field]), "years") >= 18) {
        return true;
      }
    }
    // email
    if (field === "email") {
      const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(formValue[field])) {
        return true;
      }
    }
    // phone
    if (field === "phone") {
      const regex = /^\d{10}$/;
      if (regex.test(formValue[field])) {
        return true;
      }
    }

    // address
    if (field === "address") {
      if (formValue[field].length > 9) {
        return true;
      }
    }

    return false;
  };

  // show error message
  const [showErrors, setShowErrors] = useState(false);

  // handleSubmit
  const handleSubmit = async (e, field) => {
    e.preventDefault();
    e.stopPropagation();

    // check if form is valid
    if (isFormValid(field)) {
      // set error state
      setShowErrors(false);
      try {
        const response = await updateUser(formValue);
        if (response.status === 200) {
          setAlert({
            type: "success",
            message: "Profile updated successfully",
          });
          setRefetch(true);
          setUser(response.data);
          setActiveForm("");
        }
      } catch (error) {
        console.log(error, "error");
        setAlert({
          type: "danger",
          message: "Something went wrong on the server",
        });
      }
    } else {
      setShowErrors(true);
    }
  };

  return (
    <div>
      <h4 className={styles.title}>Profile</h4>
      {/* full name */}
      <RowItem
        title="Full name"
        info={user?.fullName || "Not set"}
        action="Edit"
        active={activeForm === "name" ? true : false}
        onCancel={handleCancel}
        onAction={() => {
          setActiveForm("name");
        }}
      />
      {activeForm === "name" && (
        <div className={styles.form}>
          {/* firstName */}
          <Input
            onChange={(e) =>
              setFullName({ ...fullName, firstName: e.target.value })
            }
            value={fullName?.firstName}
            name="firstName"
            id="firstName"
            type="text"
            label="First name"
            error={showErrors && !isFormValid("firstName")}
            helper={
              showErrors && !isFormValid("firstName")
                ? "First name must be at least 3 characters"
                : ""
            }
          />

          {/* lastName */}
          <Input
            onChange={(e) =>
              setFullName({ ...fullName, lastName: e.target.value })
            }
            value={fullName?.lastName}
            name="lastName"
            id="lastName"
            type="text"
            label="Last name"
            error={showErrors && !isFormValid("lastName")}
            helper={
              showErrors && !isFormValid("lastName")
                ? "Last name must be at least 3 characters"
                : ""
            }
          />
          <Button onClick={(e) => handleSubmit(e, "fullName")} label="Save" />
        </div>
      )}

      {/* gender */}
      <RowItem
        action="Edit"
        active={activeForm === "gender" ? true : false}
        info={user?.gender || "Not set"}
        onAction={() => setActiveForm("gender")}
        onCancel={handleCancel}
        title="Gender"
      />
      {activeForm === "gender" && (
        <div className={styles.form}>
          <Select
            value={formValue?.gender}
            name="gender"
            id="gender"
            onChange={handleChange}
            label="Gender"
            options={[
              { value: "", label: "Not specified" },
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
          />
          <Button onClick={(e) => handleSubmit(e, "gender")} label="Save" />
        </div>
      )}

      {/* birthday */}
      <RowItem
        active={activeForm === "birthday" ? true : false}
        onAction={() => setActiveForm("birthday")}
        onCancel={handleCancel}
        title="Date of birth"
        info={
          user?.dateOfBirth === "0001-01-01T00:00:00"
            ? "Not set"
            : moment(user?.dateOfBirth).format("DD MMM YYYY")
        }
        action="Edit"
      />
      {activeForm === "birthday" && (
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            value={
              moment(formValue.dateOfBirth).format("YYYY-MM-DD") ===
              "0001-01-01"
                ? ""
                : moment(formValue.dateOfBirth).format("YYYY-MM-DD")
            }
            // value="2022-05-25"
            name="dateOfBirth"
            id="dateOfBirth"
            type="date"
            label="Birthday"
            error={showErrors && !isFormValid("dateOfBirth")}
            helper={
              showErrors && !isFormValid("dateOfBirth")
                ? "You must be at least 18 years old"
                : ""
            }
          />
          <Button
            onClick={(e) => handleSubmit(e, "dateOfBirth")}
            label="Save"
          />
        </div>
      )}

      {/* email */}
      <RowItem
        active={activeForm === "email" ? true : false}
        onAction={() => setActiveForm("email")}
        onCancel={handleCancel}
        title="Email address"
        info={user?.email || "Not set"}
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
            error={showErrors && !isFormValid("email")}
            helper={
              showErrors && !isFormValid("email") ? "Email must be valid" : ""
            }
          />
          <Button onClick={(e) => handleSubmit(e, "email")} label="Save" />
        </div>
      )}
      {/* phone */}
      <RowItem
        active={activeForm === "phone" ? true : false}
        onAction={() => setActiveForm("phone")}
        onCancel={handleCancel}
        title="Phone number"
        info={user?.phone || "Not set"}
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
            error={showErrors && !isFormValid("phone")}
            helper={
              showErrors && !isFormValid("phone") ? "Phone must be valid" : ""
            }
          />
          <Button onClick={(e) => handleSubmit(e, "phone")} label="Save" />
        </div>
      )}
      <RowItem
        active={activeForm === "address" ? true : false}
        onAction={() => setActiveForm("address")}
        onCancel={handleCancel}
        title="Address"
        info={user?.address || "Not set"}
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
            error={showErrors && !isFormValid("address")}
            helper={
              showErrors && !isFormValid("address")
                ? "Address must be at least 10 characters"
                : ""
            }
          />
          <Button onClick={(e) => handleSubmit(e, "address")} label="Save" />
        </div>
      )}
    </div>
  );
};

export default Profile;
