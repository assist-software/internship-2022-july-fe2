import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./AddEdit.module.scss";
import PropTypes from "prop-types";
import Input from "../../components/Input/Input";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import Button from "../../components/Button/Button";

const AddEdit = (props) => {
  //react dropzone for images

  //
  const [showPreview, setShowPreview] = useState(false);

  //input fields
  // const [formValue, setFormValue] = useState({
  //   title: "",
  //   category: "",
  //   price: "",
  //   description: "",
  //   location: "",
  //   phoneNumber: "",
  // });
  const [title, setTitle] = useState(props.title || "");
  const [category, setCategory] = useState(props.category || "");
  const [price, setPrice] = useState(props.price || "");
  const [description, setDescription] = useState(props.description || "");
  const [location, setLocation] = useState(props.location || "");
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber || "");

  //make price number only
  const handlePriceChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPrice(e.target.value);
      console.log(e.target.value);
    }
  };
  // make phone number number only
  const handlePhoneNumberChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPhoneNumber(e.target.value);
      console.log(e.target.value);
    }
  };

  const checkErrors = (input) => {
    if (input === "title") {
      if (title.length < 3) {
        return "Title must be at least 3 characters long.";
      }
    }
    if (input === "category") {
      if (category.length < 3) {
        return "Category must be at least 3 characters long.";
      }
    }
    if (input === "price") {
      if (price.length < 1 && price.value <= 0) {
        return "Price must be higher than 0.";
      }
    }
    if (input === "description") {
      if (description.length <= 1 && description.length > 100) {
        return description.length + "/100 mandatory characters";
      }
    }
    if (input === "location") {
      if (location.length < 1) {
        return "Location must be selected";
      }
    }
    if (input === "phoneNumber") {
      if (phoneNumber.length < 3) {
        return "Phoe number must be at least 3 characters long.";
      }
    }
    return "";
  };

  const isFormValid = () => {
    let isValid = true;
    Object.forEach((input) => {
      if (checkErrors(input)) {
        isValid = false;
      }
    });
    return isValid;
  };

  // const handleSubmit = async () => {
  //   if (isFormValid()) {
  //     try {
  //     } catch (error) {
  //       console.log(error, "error");
  //     }
  //   } else {
  //     console.log("Form has an error.");
  //   }
  // };
  //
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
            <Input
              label="Title"
              placeholder="Placeholder"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Input
              label="Category"
              placeholder="Select category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
            <div className={styles.price}>
              <Input
                label="Price"
                value={price}
                onChange={(event) => handlePriceChange(event)}
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
          <Row>
            <Col sm={{ span: 2, offset: 0 }}>
              <div className={styles.imgPlaceholder}>
                <Add className={styles.addIcon} />
              </div>
            </Col>
            <Col sm={{ span: 2, offset: 2 }}>
              <div className={styles.imgPlaceholder}>
                <Add className={styles.addIcon} />
              </div>
            </Col>
            <Col sm={{ span: 2, offset: 2 }}>
              <div className={styles.imgPlaceholder}>
                <Add className={styles.addIcon} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 2, offset: 0 }}>
              <div className={styles.imgPlaceholder}>
                <Add className={styles.addIcon} />
              </div>
            </Col>
            <Col sm={{ span: 2, offset: 2 }}>
              <div className={styles.imgPlaceholder}>
                <Add className={styles.addIcon} />
              </div>
            </Col>
            <Col sm={{ span: 2, offset: 2 }}>
              <div className={styles.imgPlaceholder}>
                <Add className={styles.addIcon} />
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={{ span: 2, offset: 0 }}>
              <div className={styles.imgPlaceholder}>
                <Add className={styles.addIcon} />
              </div>
            </Col>
            <Col sm={{ span: 2, offset: 2 }}>
              <div className={styles.imgPlaceholder}>
                <Add className={styles.addIcon} />
              </div>
            </Col>
            <Col sm={{ span: 2, offset: 2 }}>
              <div className={styles.imgPlaceholder}>
                <Add className={styles.addIcon} />
              </div>
            </Col>
          </Row>
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
          <Input
            label="Description details"
            placeholder="Placeholder"
            helper={`${description.length} /100 characters`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
          <Input
            label="Location"
            placeholder="Placeholder"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <div className={styles.price}>
            <Input
              label="Phone number"
              value={phoneNumber}
              onChange={(event) => handlePhoneNumberChange(event)}
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
                onClick={() => setShowPreview(true)}
              />
            </Col>

            <Col sm={{ span: 2, offset: 2 }}>
              <Button variant="primary" label="Publish" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

AddEdit.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  location: PropTypes.string,
  phoneNumber: PropTypes.number,
};

export default AddEdit;
