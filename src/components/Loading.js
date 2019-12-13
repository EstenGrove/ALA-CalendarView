import React from "react";
import styles from "../css/Loading.module.scss";

const Loading = ({ hide }) => {
  return (
    <div className={hide ? styles.hide : styles.Loading}>
      <div className={styles.Loading_text}>Loading...</div>
    </div>
  );
};

export default Loading;
