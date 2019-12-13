import React, { useState } from "react";
import styles from "../css/ViewSummaryOverview.module.scss";
import all from "../assets/all.svg";

const DataCircle = ({ dataVal, metricLabel, bgColor, customColor }) => {
  // const [currentSource, setCurrentSource] = useState(null);
  // let total = currentSource
  //   .map(item => item.heartRate)
  //   .reduce((acc, cur) => parseInt(acc, 10) + parseInt(cur, 10));

  return (
    <div
      className={styles.DataCircle}
      style={{ backgroundColor: `${bgColor}` }}
    >
      <div className={styles.outer}>
        <span className={styles.inner}>
          <span className={styles.innerLabel}>{metricLabel}</span>
          <span className={styles.avg} style={{ color: `${customColor}` }}>
            {dataVal}
          </span>
        </span>
      </div>
    </div>
  );
};

const ViewSummaryOverview = () => {
  return (
    <div className={styles.ViewSummaryOverview}>
      <header className={styles.ViewSummaryOverview_heading}>
        <span>
          <h3 className={styles.title}>Overview</h3>
          <h6>Projected vs. Actual (Avgs.) </h6>
        </span>
        <span className={styles.iconWrapper}>
          <svg
            className={styles.icon_settings}
            data-icon="overview_settings"
            data-card="3"
          >
            <use xlinkHref={`${all}#icon-settings`} />
          </svg>
        </span>
      </header>
      <section className={styles.ViewSummaryOverview_chartings}>
        <h4>Heart Rate</h4>
        <div className={styles.Data}>
          <DataCircle
            metricLabel="7-day Avg."
            dataVal="72.8"
            bgColor="#eaecef"
            customColor="#e84855"
          />
          <DataCircle
            metricLabel="30-day Avg."
            dataVal="69.5"
            bgColor="#eaecef"
            customColor="#e84855"
          />
          <h4>BP</h4>
          <DataCircle
            metricLabel="7-day Avg."
            dataVal="115/26"
            bgColor="#eaecef"
          />
          <DataCircle
            metricLabel="30-day Avg."
            dataVal="119/30"
            bgColor="#eaecef"
          />
        </div>
      </section>
    </div>
  );
};

export default ViewSummaryOverview;
