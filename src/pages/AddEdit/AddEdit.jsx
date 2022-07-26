import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Input, Button, Select } from "../../components";

import styles from "./AddEdit.module.scss";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";

import { useDropzone } from "react-dropzone";
import GetLocation from "../../components/GetLocation/GetLocation";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";
import { createListing } from "../../api/API";
import useAuth from "../../hooks/useAuth";

const AddEdit = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({});
  const [coords, setCoords] = useState({});
  const { preview, setPreview } = useStateProvider();
  const { userId } = useAuth();
  //console.log(userId, "userId");
  // form data
  const [formValue, setFormValue] = useState({
    title: preview.title || "",
    category: preview.category || "",
    price: preview.price || "",
    images: [],
    description: preview.description || "",
    location: {
      lat: coords?.lat || "",
      lng: coords?.lng || "",
      city: address?.city || "",
      state: address?.state || "",
      zip: address?.zip || "",
      country: address?.country || "",
    },
    phone: preview.phone || "",
    author: userId,
  });

  const setLocation = useCallback(() => {
    setFormValue({
      ...formValue,
      location: {
        lat: coords?.lat || "",
        lng: coords?.lng || "",
        city: address?.city || "",
        state: address?.state || "",
        zip: address?.zip || "",
        country: address?.country || "",
      },
    });
  }, [address, coords]);

  //------------------------------ useEffect
  //set location in useEffect
  useEffect(() => {
    setLocation();
  }, [setLocation]);
  //set preview in useEffect
  useEffect(() => {
    setPreview(formValue);
  }, [formValue]);

  //------------------------------- HANDLERS
  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // handleDrop
  const handleDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFormValue((prevState) => {
          return {
            ...prevState,
            images: [...prevState.images, e.target.result],
          };
        });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  // handleDelete image
  const handleDelete = (index) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        images: prevState.images.filter((image, i) => i !== index),
      };
    });
  };

  //handle Preview
  const handlePreview = () => {
    console.log(preview, " preview");
    navigate("./preview");
  };

  // handleSubmit
  const handleSubmit = async () => {
    console.log(formValue, "formval");
    try {
      if (!isFormValid()) {
        setShowErrors(true);
      } else {
        setShowErrors(false);
        const response = await createListing(formValue);
        console.log(response, "response");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //-------------------------------- validations
  // check errors
  const checkErrors = (field) => {
    // title
    if (field === "title") {
      if (formValue.title.length < 10) {
        return "Title must be at least 10 characters long";
      }
    }
    // category
    if (field === "category") {
      if (formValue.category === "") {
        return "Category must be selected";
      }
    }
    // price
    if (field === "price") {
      if (formValue.price.length < 1 || !formValue.price.match(/^[0-9]+$/)) {
        return "Price must be valid";
      }
    }
    // images
    if (field === "images") {
      if (formValue.images.length < 5) {
        return "Images must be at least 5";
      }
    }
    // description
    if (field === "description") {
      if (formValue.description.length < 10) {
        return `${formValue.description.length} /100 characters`;
      }
    }
    // location
    if (field === "location") {
      if (formValue.location.lat === "" || formValue.location.lng === "") {
        return "Location is mandatory";
      }
    }
    // phoneNumber
    if (field === "phone") {
      if (formValue.phone.length !== 10 || !formValue.phone.match(/^[0-9]+$/)) {
        return "Phone must be valid";
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

  // show errors only if clicked to submit
  const [showErrors, setShowErrors] = useState(false);

  return (
    <Container>
      <h1 className={styles.addTitle}>Add new</h1>
      <Row>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Details</h3>
            <p>Be as thorough as you can</p>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.inputs}>
            {/* title */}
            <Input
              name="title"
              id="title"
              value={formValue.title}
              label="Title"
              placeholder="Placeholder"
              onChange={handleChange}
              error={showErrors && checkErrors("title") ? true : false}
              helper={showErrors ? checkErrors("title") : ""}
            />
            {/* category */}
            <Select
              error={showErrors && checkErrors("category") ? true : false}
              helper={showErrors ? checkErrors("category") : ""}
              value={formValue.category}
              name="category"
              id="category"
              onChange={handleChange}
              label="Category"
              options={[
                { value: "", label: "Select a category" },
                { value: "category1", label: "Category 1" },
                { value: "category2", label: "Category 2" },
                { value: "category3", label: "Category 3" },
              ]}
            />
            <div className={styles.price}>
              {/* price */}
              <Input
                error={showErrors && checkErrors("price") ? true : false}
                helper={showErrors ? checkErrors("price") : ""}
                name="price"
                id="price"
                onChange={handleChange}
                label="Price"
                value={formValue.price}
              />
              <h6>lei</h6>
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>{"Photos & videos"}</h3>
            <p>Lörem ipsum trede relig, oktig. Tism rallylydnad. </p>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          {/* previews */}
          <Col
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {formValue?.images?.map((img, index) => (
              <div key={index} className={styles.preview}>
                <img src={img} alt="" />
                <Delete
                  onClick={() => {
                    handleDelete(index);
                  }}
                />
              </div>
            ))}

            {/* dropzone */}
            {formValue?.images?.length < 9 && <Dropzone onDrop={handleDrop} />}
          </Col>
          {showErrors && (
            <div>
              <p className={styles.error}>{checkErrors("images")}</p>
            </div>
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Description</h3>
            <p>Lörem ipsum trede relig, oktig. Tism rallylydnad. </p>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          {/* description */}
          <Input
            error={showErrors && checkErrors("description") ? true : false}
            helper={checkErrors("description")}
            name="description"
            id="description"
            label="Description details"
            placeholder="Placeholder"
            value={formValue.description}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Contact info</h3>
            <p>Be as thorough as you can.</p>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          {/* location */}

          <GetLocation
            address={address}
            setAddress={setAddress}
            coords={coords}
            setCoords={setCoords}
            error={showErrors && checkErrors("location") ? true : false}
            helper={showErrors ? checkErrors("location") : ""}
            id="location"
            name="location"
          />
          <div className={styles.price}>
            {/* phone */}
            <Input
              error={showErrors && checkErrors("phone") ? true : false}
              helper={showErrors ? checkErrors("phone") : ""}
              name="phone"
              id="phone"
              label="Phone number"
              value={formValue.phone}
              onChange={handleChange}
            />
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "40px", marginBottom: "60px" }}>
        <Col md={{ span: 4, offset: 0 }}></Col>
        <Col md={{ span: 6, offset: 0 }}>
          <Row>
            <Col sm={{ span: 2, offset: 5 }}>
              <Button
                variant="secondary"
                label="Preview"
                onClick={handlePreview}
              />
            </Col>

            <Col sm={{ span: 2, offset: 2 }}>
              <Button
                variant="primary"
                label="Publish"
                onClick={handleSubmit}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

function Dropzone({ onDrop, accept, open }) {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 9,
    onDrop,
  });

  const [isHovered, setHovered] = useState(false);
  return (
    <div
      onMouseLeave={() => setHovered(false)}
      onMouseOver={() => setHovered(true)}
    >
      <div
        {...getRootProps({
          className: `${styles.dropzone} ${isDragAccept && styles.accept} ${
            isDragReject && styles.reject
          }`,
        })}
      >
        <input {...getInputProps()} />
        <div>
          {isDragActive ? (
            isDragReject ? (
              <p>File not supported</p>
            ) : (
              <p>Release here</p>
            )
          ) : isHovered ? (
            <p>Drag and drop or click</p>
          ) : (
            <Add />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddEdit;
