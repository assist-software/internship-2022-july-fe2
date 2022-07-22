import React from "react";
import styles from "./PhotosModal.module.scss";
import Modal from "react-bootstrap/Modal";

import { ReactComponent as LeftChevron } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as Share } from "../../assets/icons/share.svg";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";

const PhotosModal = ({ showModal, setShowModal, images }) => {
  const tempImages = { images };
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
        {/* {images.map((image, index) => {
          if (index === 0 || index === 3 || index === 6) {
            return (
              <div className={styles.largeImage}>
                <img src={image.value} alt="" />
              </div>
            );
          } else {
            return (
              <div className={styles.smallImage}>
                <img src={image.value} alt="" />
              </div>
            );
          }
        })} */}

        <div className={styles.largeImage}>
          <img src={images[0].value} alt="" />
        </div>
        <div className={styles.smallImage}>
          <img src={images[1].value} alt="" />
          <img src={images[2].value} alt="" />
        </div>
        <div className={styles.largeImage}>
          <img src={images[3].value} alt="" />
        </div>
        <div className={styles.smallImage}>
          <img src={images[4].value} alt="" />
          <img src={images[5].value} alt="" />
        </div>
        <div className={styles.largeImage}>
          <img src={images[6].value} alt="" />
        </div>
        <div className={styles.smallImage}>
          <img src={images[7].value} alt="" />
          <img src={images[8].value} alt="" />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PhotosModal;
