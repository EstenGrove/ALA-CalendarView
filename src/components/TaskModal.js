import React, { useContext, useEffect, useState } from "react";
import styles from "../css/TaskModal.module.scss";
import { PropTypes } from "prop-types";
import sprite from "../assets/sprite.svg";
import { GlobalStateContext } from "../state/GlobalStateContext";
import { AuthContext } from "../state/AuthContext";
import { useForm } from "../utils/useForm";
import TaskDetails from "./TaskDetails";
import TaskDescription from "./TaskDescription";
import TaskModalTop from "./TaskModalTop";
import TaskUpdateForm from "./TaskUpdateForm";
import TaskItem from "./TaskItem";
import {
  updateTrackingTask,
  getResidentForTracker,
  saveUnscheduledTask
} from "../helpers/requesthelpers";
import {
  isEmptyObj,
  findTaskRecordByID,
  findAndUpdateTask,
  isEmptyArray,
  findStatusID,
  getPriorityID
} from "../helpers/misc_helpers";
import { updateTask, taskUpdateModel } from "../helpers/utils_tasks";

const initialFormState = {
  touched: {},
  isSubmitting: false,
  values: {
    TASK_STATUS: "",
    RESIDENT_UNAVAILABLE: false,
    MED_CHECK_REQUIRED: false,
    REASSESS: false,
    REASSESS_NOTES: "",
    ACTUAL_TIME: "",
    TASK_PRIORITY: "PRIORITY_NONE",
    TASK_FOLLOWUP: "",
    TASK_SIGNATURE: "",
    TASK_NOTES: ""
  }
};

// MAY NOT NEED GLOBAL STATE, REPLACE WITH PROPS INSTEAD
// add: authData, trackingTasks, currentResident, and dispatch to props

const TaskModal = ({ tasks = [], task = {}, handleClose, isOpen }) => {
  const { authData } = useContext(AuthContext);
  const { state, dispatch } = useContext(GlobalStateContext);
  const { trackingTasks, currentResident } = state.globals;
  const [sectionsState, setSectionsState] = useState({
    viewMoreItems: false,
    hideUpdateForm: true,
    formWasOpened: isOpen
  });
  const [activeTask, setActiveTask] = useState(task);
  const {
    formState,
    setFormState,
    handleChange,
    handleCheckbox,
    handleBlur,
    handleSubmit
  } = useForm({
    TASK_STATUS: "",
    RESIDENT_UNAVAILABLE: false,
    MED_CHECK_REQUIRED: false,
    REASSESS: false,
    REASSESS_NOTES: "",
    ACTUAL_TIME: "",
    TASK_PRIORITY: "NONE",
    TASK_FOLLOWUP: "",
    TASK_SIGNATURE: "",
    TASK_NOTES: ""
  });

  const {
    TASK_FOLLOWUP,
    TASK_STATUS,
    RESIDENT_UNAVAILABLE,
    MED_CHECK_REQUIRED,
    REASSESS,
    REASSESS_NOTES,
    ACTUAL_TIME,
    TASK_PRIORITY,
    TASK_SIGNATURE,
    TASK_NOTES
  } = formState.values;

  const resetForm = e => {
    e.preventDefault();
    return setFormState(initialFormState);
  };

  const handlePriority = val => {
    const { values } = formState;
    return setFormState({
      ...formState,
      values: {
        ...values,
        TASK_PRIORITY: val
      }
    });
  };

  const submitHandler = async e => {
    e.persist();
    if (RESIDENT_UNAVAILABLE) task.AssessmentTaskStatusId = 8;
    // handles new tasks
    if (!activeTask.hasOwnProperty("AssessmentTrackingId")) {
      if (RESIDENT_UNAVAILABLE) task.AssessmentTaskStatusId = 8;
      const taskClone = {
        ...taskUpdateModel,
        currentUser: {
          userID: state.currentUser.userID
        },
        currentResident: {
          residentID: currentResident.ResidentID
        },
        taskVals: {
          status: TASK_STATUS,
          priority: TASK_PRIORITY,
          notes: TASK_NOTES,
          followUpDate: TASK_FOLLOWUP,
          signedBy: TASK_SIGNATURE,
          initialBy: "",
          completedShiftId: null
        }
      };

      console.log("taskClone", taskClone);
      const unscheduledParams = {
        "db-meta": "Advantage",
        source: "AssessmentUnscheduleTask"
      };
      // handle new Task
      saveUnscheduledTask(authData.token, unscheduledParams, taskClone);
      setFormState({
        ...formState,
        isSubmitting: true
      });
      const responseData = await getResidentForTracker(
        authData.token,
        currentResident.ResidentID,
        0
      );
      const parsed = await JSON.parse(responseData.Data);
      const raw = parsed[0];
      const newState = {
        ...state,
        globals: {
          ...state.globals,
          tasks: raw.ADLCareTask
        }
      };

      await dispatch({
        type: "UPDATE_TASK",
        data: {
          newState: { ...newState }
        }
      });
      setFormState({
        ...formState,
        isSubmitting: false
      });
      return formWasClosed(e);
    }
    const matchingRecord = await findTaskRecordByID(activeTask, trackingTasks); // find AssessmentTrackingTask
    matchingRecord.AssessmentReasonId = null;
    delete matchingRecord["ModifiedBy"]; // remove extra props
    delete matchingRecord["ModifiedDate"]; // remove extra props
    delete matchingRecord["ModifiedLoginBy"]; // remove extra props
    delete matchingRecord["ModifiedStation"]; // remove extra props
    const updatedRecord = findAndUpdateTask(matchingRecord, formState.values);

    setFormState({
      ...formState,
      isSubmitting: true
    });
    const res = await updateTrackingTask(
      authData.token,
      {
        "db-meta": "Advantage",
        source: "AssessmentTrackingTask"
      },
      updatedRecord
    );
    if (!res.Data) return alert("Sorry there was an error. Please try again");
    // refetch resident data (GetResidentForAdvantageTracker)
    const responseData = await getResidentForTracker(
      authData.token,
      currentResident.ResidentID,
      0
    );

    const parsed = await responseData.Data;
    const clonedState = { ...state };

    if (responseData.Data) {
      const updatedState = {
        ...clonedState,
        globals: {
          ...clonedState.globals,
          tasks: parsed.ADLCareTask
        }
      };
      await dispatch({
        type: "UPDATE_TASK",
        data: {
          newState: { ...updatedState }
        }
      });
      setFormState({
        ...formState,
        isSubmitting: false
      });
      return formWasClosed(e);
    }
    return formWasClosed(e);
  };

  const formWasClosed = e => {
    handleClose();
    setActiveTask({});
    return resetForm(e);
  };

  useEffect(() => {
    if (!isEmptyObj(task)) {
      return setActiveTask(task);
    }
  }, [task]);

  return (
    <section className={styles.TaskModal}>
      <div className={styles.TaskModal_content}>
        <TaskModalTop task={activeTask} />
        <TaskDetails task={activeTask} />
        <TaskDescription task={activeTask} />
      </div>

      <hr style={{ opacity: ".3", marginBottom: "2rem" }} />
      <div className={styles.TaskModal_toggleForm}>
        <div
          className={styles.TaskModal_toggleForm_text}
          onClick={() => {
            return setSectionsState({
              ...sectionsState,
              hideUpdateForm: !sectionsState.hideUpdateForm
            });
          }}
        >
          {sectionsState.hideUpdateForm ? "Show" : "Hide"} Update Form
        </div>
        <svg
          className={styles.TaskModal_toggleForm_icon}
          onClick={() => {
            return setSectionsState({
              ...sectionsState,
              hideUpdateForm: !sectionsState.hideUpdateForm
            });
          }}
        >
          <use
            xlinkHref={`${sprite}#icon-view-${
              sectionsState.hideUpdateForm ? "show" : "hide"
            }`}
          ></use>
        </svg>
      </div>
      {!sectionsState.hideUpdateForm && (
        <TaskUpdateForm
          formState={formState}
          handleChange={handleChange}
          handleCheckbox={handleCheckbox}
          handleSubmit={handleSubmit}
          handleBlur={handleBlur}
          handleClick={handlePriority}
          submitHandler={submitHandler}
        />
      )}

      <button
        className={styles.TaskModal_viewItems}
        onClick={() => {
          return setSectionsState({
            ...sectionsState,
            viewMoreItems: !sectionsState.viewMoreItems
          });
        }}
      >
        {sectionsState.viewMoreItems ? "Hide" : "View"} More Items
      </button>
      {isEmptyArray(tasks) && (
        <h4 className={styles.NO_TASKS}>
          No tasks found - Please add a new task
        </h4>
      )}
      {sectionsState.viewMoreItems && tasks.length !== 0 && (
        <div className={styles.TaskModal_allItems}>
          {/* VIEW MORE ITEMS - TASK LIST */}
          <div className={styles.TaskModal_allItems_list}>
            {tasks &&
              !isEmptyArray(tasks) &&
              tasks.map((taskItem, index) => (
                <TaskItem task={taskItem} key={`${taskItem.Name}_${index}`} />
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TaskModal;

// # PropTypes
TaskModal.defaultProps = {
  tasks: [],
  task: {}
};

TaskModal.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  task: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

// add: authData, trackingTasks, currentResident, and dispatch to props
