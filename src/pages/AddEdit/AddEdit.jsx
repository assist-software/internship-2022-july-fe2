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
              <Button variant="secondary" label="Preview" />
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
