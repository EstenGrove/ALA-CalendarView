import React from "react";
import styles from "../css/NonAuthenticatedView.module.scss";

const NonAuthenticatedView = ({ children }) => {
  return <div className={styles.NonAuthenticatedView}>{children}</div>;
};

export default NonAuthenticatedView;
