import React from "react";
import styles from "../css/Spinner.module.scss";

// range helper: creates array [1...12]
const range = (start, stop, callback) => {
  return Array.from({ length: stop - start }, (_, i) => callback(i + start));
};

const Spinner = props => {
  const dots = range(0, 8, x => x + 1);

  return (
    <div className={styles.Loader}>
      {dots.map((dot, index) => (
        <div className={styles.Loader_dot} key={dot} />
      ))}
    </div>
  );
};
export default Spinner;
