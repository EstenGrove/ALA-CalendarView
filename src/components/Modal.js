import React from "react";
import styles from "../css/Modal.module.scss";

const Modal = ({ isOpen, handleClose, children, title, ...task }) => {
  return (
    <div className={isOpen ? `${styles.Modal} ${styles.isOpen}` : styles.Modal}>
      <div className={styles.Modal_top}>
        <h2 className={styles.Modal_top_title}>{title}</h2>
        <h2
          className={styles.Modal_top_closeBtn}
          title="CLOSE MODAL"
          onClick={handleClose}
        >
          ×
        </h2>
      </div>

      <main className={styles.Modal_main}>{children}</main>
    </div>
  );
};

export default Modal;
