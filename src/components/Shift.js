import React, { useState, useEffect, useContext } from "react";
import styles from "../css/Shift.module.scss";
import { PropTypes } from "prop-types";
import {
  findTaskRecordByID,
  isEmptyObj,
  findStatusID,
  findShiftID,
  getCategoryNameFromID,
  getCategoryID
} from "../helpers/misc_helpers";
import { GlobalStateContext } from "../state/GlobalStateContext";

const Shift = ({
  status = "NO-TASK",
  shift = "ALL",
  day,
  ADL,
  id,
  task = {},
  modalHandler
}) => {
  const { state } = useContext(GlobalStateContext);
  const { trackingTasks } = state.globals;
  const [taskStatus, setTaskStatus] = useState(status);

  const locateTaskRecord = () => {
    if (task === undefined || isEmptyObj(task)) {
      return {};
    }
    const record = findTaskRecordByID(task, trackingTasks);
    return record;
  };

  locateTaskRecord();

  useEffect(() => {
    if (isEmptyObj(task)) {
      return setTaskStatus("NO-TASK");
    }
  }, [setTaskStatus, task, task.TaskStatus]);

  useEffect(() => {
    if (state.app.wasUpdated) {
      return setTaskStatus(task.TaskStatus);
    }
  }, [state.app.wasUpdated, task.TaskStatus]);

  if (taskStatus === "NO-TASK") {
    // used for new Task creation
    let newTask = {
      ...task,
      AssessmentTaskStatusId: findStatusID(status)
    };

    return (
      <span
        className={
          taskStatus
            ? `${styles.Shift} ${styles[taskStatus]}`
            : `${styles.Shift}`
        }
        onClick={() => modalHandler(newTask)}
        data-day={day}
        data-adl={ADL}
        data-shift={shift}
        key={id}
        title={taskStatus}
      >
        {shift || ""}
      </span>
    );
  }
  return (
    <span
      className={
        taskStatus ? `${styles.Shift} ${styles[taskStatus]}` : `${styles.Shift}`
      }
      onClick={task => modalHandler(task)}
      data-day={day}
      data-adl={ADL}
      data-shift={shift}
      key={id}
      title={taskStatus}
    >
      {shift || ""}
    </span>
  );
};

export default Shift;

Shift.defaultProps = {
  status: "NO-TASK",
  shift: "ALL",
  task: {}
};

Shift.propTypes = {
  status: PropTypes.string,
  shift: PropTypes.string,
  task: PropTypes.object,
  day: PropTypes.string,
  ADL: PropTypes.string,
  id: PropTypes.string,
  modalHandler: PropTypes.func
};
