import React, { useEffect, useState } from "react";
import styles from "./PhotosModal.module.scss";
import Modal from "react-bootstrap/Modal";

import { ReactComponent as LeftChevron } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as Share } from "../../assets/icons/share.svg";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";

const PhotosModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      fullscreen={true}
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
          <img src="https://picsum.photos/200/300" alt="" />
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className={styles.largeImage}>
          <img src="https://picsum.photos/600/400" alt="" />
        </div>
        <div className={styles.smallImage}>
          <img src="https://picsum.photos/200/300" alt="" />
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div className={styles.largeImage}>
          <img src="https://picsum.photos/600/400" alt="" />
        </div>
        <div className={styles.smallImage}>
          <img src="https://picsum.photos/200/300" alt="" />
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PhotosModal;
