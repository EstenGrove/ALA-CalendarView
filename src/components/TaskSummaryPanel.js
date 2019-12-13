import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import styles from "../css/TaskSummaryPanel.module.scss";
import {
  isEmptyArray,
  getCount,
  getPercentage,
  getRemaining
} from "../helpers/misc_helpers";

const TaskSummaryPanel = ({
  hasBeenUpdated = false,
  categories,
  tasks = []
}) => {
  const [taskCounts, setTaskCounts] = useState({
    total: tasks.length,
    complete: getCount(tasks, "COMPLETE"),
    pending: getCount(tasks, "PENDING"),
    missedEvent: getCount(tasks, "MISSED-EVENT"),
    notComplete: getCount(tasks, "NOT-COMPLETE"),
    inProgress: getCount(tasks, "IN-PROGRESS"),
    remaining: getRemaining(tasks, "COMPLETE")
  });

  const [percentages, setPercentages] = useState({
    total: tasks.length,
    complete: getPercentage(tasks.length, taskCounts.complete),
    pending: getPercentage(tasks.length, taskCounts.pending),
    missedEvent: getPercentage(tasks.length, taskCounts.missedEvent),
    notComplete: getPercentage(tasks.length, taskCounts.notComplete),
    inProgress: getPercentage(tasks.length, taskCounts.inProgress)
  });

  console.log(taskCounts);
  console.log(percentages);

  useEffect(() => {
    if (hasBeenUpdated) {
      setTaskCounts({
        total: tasks.length,
        complete: getCount(tasks, "COMPLETE"),
        pending: getCount(tasks, "PENDING"),
        missedEvent: getCount(tasks, "MISSED-EVENT"),
        notComplete: getCount(tasks, "NOT-COMPLETE"),
        inProgress: getCount(tasks, "IN-PROGRESS"),
        remaining: getRemaining(tasks, "COMPLETE")
      });
      return setPercentages({
        total: tasks.length,
        complete: getPercentage(tasks.length, taskCounts.complete),
        pending: getPercentage(tasks.length, taskCounts.pending),
        missedEvent: getPercentage(tasks.length, taskCounts.missedEvent),
        notComplete: getPercentage(tasks.length, taskCounts.notComplete),
        inProgress: getPercentage(tasks.length, taskCounts.inProgress)
      });
    }
  }, [
    hasBeenUpdated,
    taskCounts.complete,
    taskCounts.inProgress,
    taskCounts.missedEvent,
    taskCounts.notComplete,
    taskCounts.pending,
    tasks
  ]);

  return (
    <section className={styles.TaskSummary}>
      <h4 className={styles.TaskSummary_title}>For the Week</h4>
      <div className={styles.TaskSummary_inner}>
        <div className={styles.TaskSummary_inner_tile}>
          <div className={styles.TaskSummary_inner_tile_count}>
            {!isEmptyArray(tasks) ? taskCounts.total : 0}
          </div>
          <h4 className={styles.TaskSummary_inner_tile_heading}>Task Count</h4>
        </div>
        <div className={styles.TaskSummary_inner_tile}>
          <div
            className={`${styles.TaskSummary_inner_tile_count}
              ${styles.green}`}
          >
            {!isEmptyArray(tasks) ? percentages.complete : 0}
          </div>
          <h4 className={styles.TaskSummary_inner_tile_heading}>Completed</h4>
        </div>
        <div className={styles.TaskSummary_inner_tile}>
          <div
            className={`${styles.TaskSummary_inner_tile_count}
              ${styles.red}`}
          >
            {!isEmptyArray(tasks) ? percentages.pending : 0}
          </div>
          <h4 className={styles.TaskSummary_inner_tile_heading}>Pending</h4>
        </div>
        <div className={styles.TaskSummary_inner_tile}>
          <div
            className={`${styles.TaskSummary_inner_tile_count}
              ${styles.red}`}
          >
            {!isEmptyArray(tasks) ? taskCounts.missedEvent : 0}
          </div>
          <h4 className={styles.TaskSummary_inner_tile_heading}>
            Missed Tasks
          </h4>
        </div>
        <div className={styles.TaskSummary_inner_tile}>
          <div
            className={`${styles.TaskSummary_inner_tile_count}
              ${styles.red}`}
          >
            {!isEmptyArray(tasks) ? taskCounts.remaining : 0}
          </div>
          <h4 className={styles.TaskSummary_inner_tile_heading}>Remaining</h4>
        </div>
      </div>
    </section>
  );
};

export default TaskSummaryPanel;

// #PropTypes
TaskSummaryPanel.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  tasks: PropTypes.arrayOf(PropTypes.object)
};
