import React from "react";
import { PropTypes } from "prop-types";
import styles from "../css/OtherTasksSection.module.scss";
import Dropdown from "./Dropdown";
import { checkCategoryNaming, numGen } from "../helpers/misc_helpers";
import { ModelsAdvantage } from "../helpers/data_models";
import {
  createNewTask,
  countTrackingRecords,
  createNewAssessmentTask
} from "../helpers/requesthelpers";
import { useForm } from "../utils/useForm";
import Textarea from "./Textarea";

const {
  Tasks: { AssessmentTrackingTask: taskModel }
} = ModelsAdvantage;

const OtherTasksSection = ({ categories, currentResident, authData }) => {
  const { formState, handleSubmit, handleChange } = useForm({
    UNSCHEDULED_CATEGORY: "",
    UNSCHEDULED_PRIORITY: "",
    UNSCHEDULED_FOLLOWUP: "",
    UNSCHEDULED_SIGNATURE: "",
    UNSCHEDULED_NOTES: ""
  });
  // grabs categories from props which comes from state.globals.categories
  const adls = categories.map(adl => checkCategoryNaming(adl.AdlCategory));

  const submitUnscheduledTask = async e => {
    e.persist();
    const countParams = {
      index: 0,
      rows: 500
    };

    const {
      UNSCHEDULED_PRIORITY,
      UNSCHEDULED_FOLLOWUP,
      UNSCHEDULED_SIGNATURE,
      UNSCHEDULED_NOTES
    } = formState.values;

    const assessementTaskModel = {
      AssessmentTaskId: numGen(100, 500),
      Name: `ADL-${numGen(100, 500)}`,
      Description: UNSCHEDULED_NOTES,
      ADLId: 14,
      AssessmentCategoryId: 14,
      IsActive: true,
      CreatedDate: new Date()
    };

    const trackingParams = {
      "db-meta": "Advantage",
      source: "AssessmentTask"
      // residentId: currentResident.ResidentID
    };
    const assessmentTaskResponse = await createNewAssessmentTask(
      authData.token,
      trackingParams,
      assessementTaskModel,
      null
    );
    const newTaskID = assessmentTaskResponse.Data;
    const count = await countTrackingRecords(authData.token, countParams);
    const newTaskParams = {
      "db-meta": "Advantage",
      source: "AssessmentTrackingTask"
    };
    const clonedRecord = {
      ...taskModel,
      AssessmentTrackingTaskId: 12,
      AssessmentTrackingId: count + 1,
      AssessmentTaskId: newTaskID,
      UserId: null,
      EntryDate: new Date(),
      CompletedDate: null,
      FollowUpDate: UNSCHEDULED_FOLLOWUP,
      SignedBy: UNSCHEDULED_SIGNATURE,
      InitialBy: null,
      Notes: UNSCHEDULED_NOTES + "Priority: " + UNSCHEDULED_PRIORITY,
      IsCompleted: false,
      IsActive: true,
      AssessmentReasonId: null,
      CompletedAssessmentShiftId: null,
      AssessmentResolutionId: null,
      IsFinal: false,
      AssessmentTaskStatusId: 1
    };
    const submitTask = () =>
      createNewTask(authData.token, newTaskParams, clonedRecord);
    if (assessmentTaskResponse.Data) {
      return handleSubmit(e, submitTask);
    }

    return handleSubmit(e);
  };

  return (
    <section className={styles.Other}>
      <h3 className={styles.Other_heading}>Other Tasks</h3>
      <hr className={styles.border} />

      {/* LEFT SIDE DESCRIPTION */}
      <div className={styles.Other_main}>
        <div className={styles.Other_left}>
          <h5 className={styles.Other_left_subheading}>Category</h5>
          <span className={styles.Other_left_desc}>
            Choose a category or ADL for the unscheduled task. Apply an optional
            priority and follow-up date.
          </span>

          <h5 className={`${styles.Other_left_subheading} ${styles.last}`}>
            Required Signature
          </h5>
          <span className={styles.Other_left_desc}>
            Employees must sign their name upon entering any unscheduled tasks.
          </span>

          <h5 className={`${styles.mobile_heading} ${styles.hide}`}>
            Unscheduled
          </h5>
          <span className={`${styles.mobile_desc} ${styles.hide}`}>
            This section is for entering tasks that were either unscheduled or
            do not fall under an existing ADL category yet need to be tracked
            accordingly.
          </span>
        </div>
        {/* RIGHT SIDE FORM */}
        <div className={styles.Other_right}>
          <h5 className={styles.Other_right_subheading}>ADL</h5>
          <Dropdown
            value={formState.values.UNSCHDEDULED_CATEGORY}
            type="text"
            name="UNSCHEDULED_CATEGORY"
            id="UNSCHEDULED_CATEGORY"
            options={[...adls]}
            className={styles.Other_right_input}
            customWidth="100%"
            hideLabel={true}
            borderCol="#c9c7cb"
            handleChange={handleChange}
          />
          <h5 className={styles.Other_right_subheading}>Priority</h5>
          <Dropdown
            value={formState.values.UNSCHEDULED_PRIORITY}
            type="text"
            name="UNSCHEDULED_PRIORITY"
            id="UNSCHEDULED_PRIORITY"
            options={["Urgent", "None", "Finish Next"]}
            className={styles.Other_right_input}
            customWidth="100%"
            hideLabel={true}
            borderCol="#c9c7cb"
            handleChange={handleChange}
          />

          <h5 className={styles.Other_right_subheading}>Follow-Up Date</h5>
          <input
            value={formState.values.UNSCHEDULED_FOLLOWUP}
            type="datetime-local"
            name="UNSCHEDULED_FOLLOWUP"
            id="UNSCHEDULED_FOLLOWUP"
            className={styles.Other_right_input}
            onChange={handleChange}
          />
          <h5 className={styles.Other_right_subheading}>Notes/Comments</h5>
          <Textarea
            val={formState.values.UNSCHEDULED_NOTES}
            name="UNSCHEDULED_NOTES"
            id="UNSCHEDULED_NOTES"
            placeholder="Enter any notes or comments..."
            required={true}
            maxChar={200}
            addRequiredFlag={true}
            enableCharCount={true}
            handleChange={handleChange}
            customStyles={{
              backgroundColor: "#ffffff",
              border: "1px solid rgb(201, 199, 203)"
            }}
          />

          <h5 className={`${styles.Other_right_subheading} ${styles.spacing}`}>
            Employee Signature
          </h5>
          <input
            value={formState.values.UNSCHEDULED_SIGNATURE}
            type="text"
            name="UNSCHEDULED_SIGNATURE"
            id="UNSCHEDULED_SIGNATURE"
            className={styles.Other_right_input}
            onChange={handleChange}
          />
          <div className={styles.btnWrapper}>
            <button
              className={styles.Other_right_btn}
              onClick={submitUnscheduledTask}
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherTasksSection;

OtherTasksSection.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  currentResident: PropTypes.object,
  authData: PropTypes.object
};
