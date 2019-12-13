import React from "react";
import all from "../assets/all.svg";
import styles from "../css/ViewSummaryTasks.module.scss";
import BarGraph from "../charts/BarGraph";

const ViewSummaryTasks = () => {
  return (
    <div className={styles.ViewSummaryTasks}>
      <div className={styles.ViewSummaryTasks_heading}>
        <span>
          <h1>Tasks</h1>
          <h6>Projected vs. Actual (in minutes)</h6>
        </span>
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
      <section className={styles.ViewSummaryTasks_chartings}>
        <BarGraph />
      </section>
    </div>
  );
};

export default ViewSummaryTasks;
