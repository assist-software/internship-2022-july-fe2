import React, { useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Input, Button, Select } from "../../components";

import styles from "./AddEdit.module.scss";
import { ReactComponent as Add } from "../../assets/icons/add.svg";

import { useDropzone } from "react-dropzone";

import { nanoid } from "nanoid";

const AddEdit = (props) => {
  // form data
  const [formValue, setFormValue] = useState({
    title: "",
    category: "",
    price: "",
    images: [],
    description: "",
    location: "",
    phoneNumber: "",
  });

  console.log(formValue, "formValue");

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // test
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: nanoid(), src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

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
            />
            {/* category */}
            <Select
              value={formValue.category}
              name="category"
              id="category"
              onChange={handleChange}
              label="Category"
              options={[
                { value: "category1", label: "Category 1" },
                { value: "category2", label: "Category 2" },
                { value: "category3", label: "Category 3" },
              ]}
            />
            <div className={styles.price}>
              {/* price */}
              <Input
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
          <Row>
            <Col sm={{ span: 2, offset: 0 }}>
              <MyDropzone />
            </Col>
            <Col sm={{ span: 2, offset: 2 }}>
              <MyDropzone />
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
          {/* description */}
          <Input
            name="description"
            id="description"
            label="Description details"
            placeholder="Placeholder"
            helper={`${formValue.description.length} /100 characters`}
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
          <Input
            name="location"
            id="location"
            label="Location"
            placeholder="Placeholder"
            value={formValue.location}
            onChange={handleChange}
          />
          <div className={styles.price}>
            {/* phone */}
            <Input
              name="phoneNumber"
              id="phoneNumber"
              label="Phone number"
              value={formValue.phoneNumber}
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

function MyDropzone({ open }) {
  const { getRootProps, getInputProps } = useDropzone({});
  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input className="input-zone" {...getInputProps()} />
      <div className="text-center">
        <p className="dropzone-content">
          Drag drop some files here, or click to select files
        </p>
      </div>
    </div>
  );
}

export default AddEdit;
