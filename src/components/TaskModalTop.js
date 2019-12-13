import React from "react";
import styles from "../css/TaskModalTop.module.scss";
import { PropTypes } from "prop-types";
import sprite from "../assets/sprite.svg";
import { format } from "date-fns";
import {
  replaceNullWithMsg,
  getCategoryNameFromID
} from "../helpers/misc_helpers";

// check for emptyTask
const checkForEmptyTask = task => {
  if (!task.hasOwnProperty("AssessmentTrackingId")) {
    return true;
  }
  return false;
};

// ADL CATEGORY & DUE DATE (TOP SECTION)

const TaskModalTop = ({ task = {} }) => {
  console.log("TaskModalTop", task);
  return (
    <div className={styles.TaskModalTop}>
      <h2 className={styles.TaskModalTop_title}>
        {checkForEmptyTask(task)
          ? getCategoryNameFromID(task.AssessmentCategoryId)
          : replaceNullWithMsg(task.ADLCategory, "NA")}
      </h2>

      <div className={styles.TaskModalTop_date}>
        <div className={styles.TaskModalTop_date_text}>DUE DATE</div>
        <svg className={styles.TaskModalTop_date_icon}>
          <use xlinkHref={`${sprite}#icon-calendar1`}></use>
        </svg>
        <div className={styles.TaskModalTop_date_due}>
          {!task && !task.TrackDate ? "" : format(task.TrackDate, "MM/DD/YY")}
        </div>
      </div>
    </div>
  );
};

export default TaskModalTop;

TaskModalTop.defaultProps = {
  task: {}
};

TaskModalTop.propTypes = {
  task: PropTypes.object
};
