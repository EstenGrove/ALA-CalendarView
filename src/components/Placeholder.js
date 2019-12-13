import React from "react";
import styles from "../css/Placeholder.module.scss";

const Placeholder = ({ children, msg }) => {
  const keyGenerator = () =>
    Math.random()
      .toString(36)
      .substr(2, 5);

  return (
    <div className={styles.Placeholder} key={keyGenerator()}>
      <h1 className={styles.Placeholder_heading}>{msg}</h1>
      <div className={styles.Placeholder_inner}>{children}</div>
    </div>
  );
};
export default Placeholder;
