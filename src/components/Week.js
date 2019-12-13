import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import styles from "../css/Week.module.scss";
import { format } from "date-fns";
import ADL from "./ADL";
import ADLByDay from "./ADLByDay";
import MainTaskModal from "./MainTaskModal";
import TaskModal from "./TaskModalTop";
import Spinner from "./Spinner";

const Week = ({
  isLoading,
  wasUpdated,
  currentDays,
  categories,
  tasks,
  trackingTasks
}) => {
  // local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskHasChanged, setTaskHasChanged] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [updatedTasks, setUpdatedTasks] = useState(tasks);

  const modalHandler = async task => {
    const currentTask = { ...task };
    setSelectedTask(currentTask);

    // if (
    //   isEmptyObj(currentTask) ||
    //   currentTask.AssessmentTrackingId !== task.AssessmentTrackingId
    // ) {
    //   return setIsModalOpen(!isModalOpen);
    // }
    return setIsModalOpen(!isModalOpen);
  };

  const submitHandler = e => {
    e.preventDefault();
    const timestamp = new Date();

    return timestamp;
  };

  useEffect(() => {
    if (wasUpdated && tasks) {
      return setUpdatedTasks(tasks);
    }
  }, [tasks, wasUpdated]);

  // MAIN SPINNER WHEN LOADING A RESIDENT
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className={styles.Week}>
        <>
          {/* ITERATE THRU DAYS IN THE MONTH AND PASS: DAY, CATEGORIES, TASKS AND MODALHANDLER AS PROPS */}
          <ADL categories={categories} />
          {currentDays &&
            currentDays.map((day, index) => (
              <ADLByDay
                categories={categories}
                tasks={updatedTasks}
                day={format(day, "dddd")}
                key={`${day}_${index}`}
                modalHandler={modalHandler}
              />
            ))}
        </>
      </div>

      {/* USED FOR UPDATING/STATUSING TASKS */}
      <MainTaskModal
        title="Care Tracking"
        handleClose={modalHandler}
        isOpen={isModalOpen}
        task={selectedTask}
        tasks={tasks}
      >
        <TaskModal
          tasks={tasks}
          task={selectedTask}
          submitHandler={submitHandler}
          triggerFormReset={taskHasChanged}
          trackingTasks={trackingTasks}
        />
      </MainTaskModal>
    </>
  );
};

export default Week;

Week.propTypes = {
  isLoading: PropTypes.bool,
  wasUpdated: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.object),
  tasks: PropTypes.arrayOf(PropTypes.object),
  trackingTasks: PropTypes.arrayOf(PropTypes.object),
  currentDays: PropTypes.arrayOf(PropTypes.instanceOf(Date))
};
