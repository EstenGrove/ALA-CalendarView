import React from "react";
import styles from "../css/TaskDescription.module.scss";
import { PropTypes } from "prop-types";
import { replaceNullWithMsg } from "../helpers/misc_helpers";

const TaskDescription = ({ task }) => {
  return (
    <div className={styles.TaskDescription}>
      <p className={styles.TaskDescription_text}>
        {replaceNullWithMsg(task.TaskDescription, "No description")}
      </p>
      <div className={styles.TaskDescription_right}>
        <p className={styles.TaskDescription_right_day}>
          <i style={{ opacity: ".4" }}>Shift</i>{" "}
          {(!task && !task.Shift) || task.Shift === "ALL" ? "ANY" : task.Shift}
        </p>
        <p className={styles.TaskDescription_right_day}>
          <i style={{ opacity: ".4" }}>Scheduled for</i>{" "}
          {replaceNullWithMsg(task.DayOfWeek, "Unscheduled")}
        </p>
      </div>
    </div>
  );
};

export default TaskDescription;

TaskDescription.propTypes = {
  task: PropTypes.object
};
