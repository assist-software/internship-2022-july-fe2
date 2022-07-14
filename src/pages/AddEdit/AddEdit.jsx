import React from "react";
import Input from "../../components/Input/Input";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./AddEdit.module.scss";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import Button from "../../components/Button/Button";

const AddEdit = () => {
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
            <Input label="Title" placeholder="Placeholder" />
            <Input label="Category" placeholder="Select category" />
            <div className={styles.price}>
              <Input label="Price" />
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
            helper="0/100 mandatory characters"
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
          <Input label="Location" placeholder="Placeholder" />
          <div className={styles.price}>
            <Input label="Phone number" />
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

export default AddEdit;
