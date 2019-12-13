import React from "react";
import styles from "../css/ErrorMessage.module.scss";
import sprite from "../assets/alerts.svg";

const ErrorMessage = ({ heading, subheading, text, closeError }) => {
  return (
    <div className={styles.ErrorMessage}>
      <div className={styles.ErrorMessage_left}>
        <svg className={styles.ErrorMessage_left_icon}>
          <use xlinkHref={`${sprite}#icon-exclamation-outline`} />
        </svg>
      </div>
      <div className={styles.ErrorMessage_content}>
        <h3 className={styles.ErrorMessage_content_heading}>{heading}</h3>
        <h6 className={styles.ErrorMessage_content_subheading}>{subheading}</h6>
        <p className={styles.ErrorMessage_content_text}>{text}</p>
      </div>

      <div className={styles.ErrorMessage_close}>
        <svg className={styles.ErrorMessage_close_icon} onClick={closeError}>
          <use xlinkHref={`${sprite}#icon-close-outline`} />
        </svg>
      </div>
    </div>
  );
};
export default ErrorMessage;
