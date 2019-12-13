import React from "react";
import { PropTypes } from "prop-types";
import styles from "../css/TaskDetails.module.scss";
import { replaceNullWithMsg } from "../helpers/misc_helpers";
import StatusBadge from "./StatusBadge";

// TASK STATUS BADGE AND POINTS

const TaskDetails = ({ task }) => {
  return (
    <div className={styles.TaskDetails}>
      <div className={styles.TaskDetails_status}>
        <StatusBadge status={task.TaskStatus} />
        <div className={styles.TaskDetails_status_points}>
          <span>{replaceNullWithMsg(task.Points, 0)}</span>
          Pts.
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

TaskDetails.propTypes = {
  task: PropTypes.object.isRequired
};
