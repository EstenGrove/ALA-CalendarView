import React from "react";
import { PropTypes } from "prop-types";
import styles from "../css/CalendarHeading.module.scss";
import { format } from "date-fns";

const CalendarHeading = ({ currentWeek, currentDays, checkForSameMonth }) => {
  function sameMonthHandler(days) {
    return days.map((day, index) =>
      checkForSameMonth(currentWeek.weekEnd, day) ? (
        <div className={styles.headings_date} key={day.toString()}>
          {format(day, "D")}
          <span className={styles.headings_day}>{format(day, "ddd")}</span>
        </div>
      ) : (
        <div
          className={styles.headings_date}
          key={day.toString()}
          style={{ opacity: ".3" }}
        >
          {day.toString().slice(8, 10)}
          <span className={styles.headings_day} style={{ opacity: ".5" }}>
            {format(day, "ddd")}
          </span>
        </div>
      )
    );
  }
  return (
    <div className={styles.CalendarHeading}>
      <section className={styles.headings}>
        <div className={styles.headings_category}>
          <h4 className={styles.headings_category__Text}>ADL</h4>
        </div>
        {sameMonthHandler(currentDays)}
      </section>
    </div>
  );
};

export default CalendarHeading;

// #PropTypes
CalendarHeading.propTypes = {
  currentWeek: PropTypes.exact({
    weekStart: PropTypes.instanceOf(Date),
    weekEnd: PropTypes.instanceOf(Date)
  }).isRequired,
  currentDays: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  checkForSameMonth: PropTypes.func.isRequired
};
