import React from "react";

import styles from "../css/ViewSummaryResidentDetails.module.scss";

const ViewSummaryResidentDetails = ({ resident }) => {
  return (
    <div className={styles.ViewSummaryResidentDetails}>
      <h1 className={styles.name}>{resident.name}</h1>
    </div>
  );
};

export default ViewSummaryResidentDetails;
