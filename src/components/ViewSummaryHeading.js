import React from "react";
import styles from "../css/ViewSummaryHeading.module.scss";
import all from "../assets/all.svg";

const ViewSummaryHeading = ({ currentResident }) => {
  const handlePrint = e => {
    return window.print();
  };
  console.log("ViewSummaryHeading", currentResident);
  return (
    <div className={styles.ViewSummaryHeading}>
      <h1 className={styles.ViewSummaryHeading_title}>
        Resident Summaries & Reports
      </h1>
      <aside className={styles.actionBox}>
        <svg className={styles.icon_print} onClick={handlePrint}>
          <use xlinkHref={`${all}#icon-print1`} />
        </svg>
        <h3 className={styles.pdf}>PDF</h3>
      </aside>
    </div>
  );
};

export default ViewSummaryHeading;
