import React from "react";
import styles from "../css/AuthenticatedView.module.scss";

const AuthenticatedView = ({ children }) => {
  return <div className={styles.AuthenticatedView}>{children}</div>;
};

export default AuthenticatedView;
