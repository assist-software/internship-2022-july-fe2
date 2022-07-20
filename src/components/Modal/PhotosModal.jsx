import React, { useState } from "react";
import styles from "./PhotosModal.module.scss";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as GridDense } from "../../assets/icons/grid-dense.svg";
import { ReactComponent as LeftChevron } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as Share } from "../../assets/icons/share.svg";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";
import Button from "../Button/Button";

const PhotosModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  return (
    <div>
      <Button
        variant="secondary"
        label="Show all photos"
        icon={<GridDense className={styles.gridDense} />}
        position="left"
        onClick={() => {
          setShowModal(true);
          setFullscreen(true);
        }}
      />

      <Modal
        show={showModal}
        fullscreen={fullscreen}
        onHide={() => setShowModal(false)}
      >
        <Modal.Title className={styles.modalTitle}>
          <LeftChevron
            className={styles.chevron}
            onClick={() => setShowModal(false)}
          />
          <div className={styles.rightButtons}>
            <div className={styles.share}>
              <Share />
              <h5>Share</h5>
            </div>
            <div className={styles.save}>
              <Heart />
              <h5>Save</h5>
            </div>
          </div>
        </Modal.Title>

        <Modal.Body className={styles.modalBody}>
          <div className={styles.largeImage}>
            <img src="https://picsum.photos/600/400" alt="" />
          </div>
          <div className={styles.smallImage}>
            <img src="https://picsum.photos/400/500" alt="" />
            <img src="https://picsum.photos/400/500" alt="" />
          </div>
          <div className={styles.largeImage}>
            <img src="https://picsum.photos/600/400" alt="" />
          </div>
          <div className={styles.smallImage}>
            <img
              style={{ justifyContent: "flex-start" }}
              src="https://picsum.photos/400/500"
              alt=""
            />
            <img src="https://picsum.photos/400/500" alt="" />
          </div>
          <div className={styles.largeImage}>
            <img src="https://picsum.photos/600/400" alt="" />
          </div>
          <div className={styles.smallImage}>
            <img
              style={{ justifyContent: "flex-start" }}
              src="https://picsum.photos/400/500"
              alt=""
            />
            <img src="https://picsum.photos/400/500" alt="" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PhotosModal;
