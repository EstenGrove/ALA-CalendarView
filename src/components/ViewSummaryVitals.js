import React from "react";

import styles from "../css/ViewSummaryVitals.module.scss";
import all from "../assets/all.svg";
import LineGraph from "../charts/LineGraph";
import AreaGraph from "../charts/AreaGraph";

const ViewSummaryVitals = () => {
  return (
    <>
      <div className={styles.ViewSummaryVitals}>
        <div className={styles.ViewSummaryVitals_heading}>
          <h1>Vitals</h1>
          <span>
            <svg
              className={styles.icon_settings}
              data-icon="vitals_settings"
              data-card="1"
            >
              <use xlinkHref={`${all}#icon-settings`} />
            </svg>
          </span>
        </div>
        <section className={styles.ViewSummaryVitals_chartings}>
          <LineGraph />
          <span className={styles.ViewSummaryVitals_chartings_split}></span>
          <AreaGraph />
        </section>
      </div>
    </>
  );
};

export default ViewSummaryVitals;
