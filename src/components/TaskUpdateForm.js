import React from "react";
import { PropTypes } from "prop-types";
import styles from "../css/TaskUpdateForm.module.scss";
import Dropdown from "./Dropdown";
import StyledCheckbox from "./StyledCheckbox";
import Textarea from "./Textarea";
import TextInput from "./TextInput";
import StatefulButton from "./StatefulButton";
import PriorityButton from "./PriorityButton";

const TaskUpdateForm = ({
  selection,
  handleClick,
  handleChange,
  handleCheckbox,
  handleBlur,
  submitHandler,
  formState
}) => {
  return (
    <section className={styles.TaskUpdateForm}>
      <h2 className={styles.TaskUpdateForm_title}>Update/Status Task</h2>
      <form>
        <Dropdown
          val={formState.values.TASK_STATUS}
          htmlFor="TASK_STATUS"
          id="TASK_STATUS"
          name="TASK_STATUS"
          label="Select a status:"
          options={[
            "PENDING",
            "COMPLETE",
            "MISSED-EVENT",
            "NOT-COMPLETE",
            "IN-PROGRESS"
          ]}
          key="STATUS"
          handleChange={handleChange}
        />
        <StyledCheckbox
          val={formState.values.RESIDENT_UNAVAILABLE}
          name="RESIDENT_UNAVAILABLE"
          label="Resident Unavailable (out of room)"
          id="RESIDENT_UNAVAILABLE"
          key="RESIDENT_UNAVAILABLE"
          handleCheckbox={handleCheckbox}
          handleBlur={handleBlur}
        />
        <StyledCheckbox
          val={formState.values.MED_CHECK_REQUIRED}
          name="MED_CHECK_REQUIRED"
          label="Med Check Required"
          id="MED_CHECK_REQUIRED"
          key="MED_CHECK_REQUIRED"
          handleCheckbox={handleCheckbox}
          handleBlur={handleBlur}
        />

        <StyledCheckbox
          val={formState.values.REASSESS}
          name="REASSESS"
          label="Re-assess"
          id="REASSESS"
          key="REASSESS"
          handleCheckbox={handleCheckbox}
          handleBlur={handleBlur}
        />
        <section
          className={
            formState.values.REASSESS
              ? `${styles.reassess_notes} ${styles.show}`
              : styles.reassess_notes
          }
          aria-expanded={true}
        >
          <Textarea
            name="REASSESS_NOTES"
            val={formState.values.REASSESS_NOTES}
            label="Reason for Re-assessment"
            placeholder="Please provide a reason..."
            handleChange={handleChange}
            handleBlur={handleBlur}
            wrap="soft"
            minLength={0}
            maxLength={250}
            required={true}
            enableCharCount={true}
            maxChar={200}
            addRequiredFlag={true}
            key="REASSESS_NOTES"
          />
        </section>
        <TextInput
          value={formState.values.ACTUAL_TIME}
          name="ACTUAL_TIME"
          type="number"
          label="How long did this take? (in minutes)"
          key="ACTUAL_TIME"
          isRequired={true}
          handleChange={handleChange}
          handleBlur={handleBlur}
          placeholder="25..."
          addRequiredFlag={true}
        />

        <TextInput
          value={formState.values.TASK_FOLLOWUP}
          name="TASK_FOLLOWUP"
          type="text"
          label="Follow-up Date"
          key="TASK_FOLLOWUP"
          isRequired={true}
          handleChange={handleChange}
          handleBlur={handleBlur}
          placeholder="MM/DD/YYYY"
          addRequiredFlag={true}
        />

        <TextInput
          value={formState.values.TASK_SIGNATURE}
          name="TASK_SIGNATURE"
          label="Sign your name:"
          key="TASK_SIGNATURE"
          isRequired={true}
          handleChange={handleChange}
          handleBlur={handleBlur}
          addRequiredFlag={true}
        />

        <h4 className={styles.TaskUpdateForm_priorities_label}>
          Set a Priority
        </h4>
        <section className={styles.TaskUpdateForm_priorities}>
          <PriorityButton
            id="PRIORITY_NONE"
            name="PRIORITY_NONE"
            label="None"
            isChecked={formState.values.TASK_PRIORITY === "NONE"}
            handleClick={() => handleClick("NONE")}
          />
          <PriorityButton
            id="PRIORITY_LOW"
            name="PRIORITY_LOW"
            label="!"
            isChecked={formState.values.TASK_PRIORITY === "LOW"}
            handleClick={() => handleClick("LOW")}
          />
          <PriorityButton
            id="PRIORITY_MEDIUM"
            name="PRIORITY_MEDIUM"
            label="!!"
            isChecked={formState.values.TASK_PRIORITY === "MEDIUM"}
            handleClick={() => handleClick("MEDIUM")}
          />
          <PriorityButton
            id="PRIORITY_HIGH"
            name="PRIORITY_HIGH"
            label="!!!"
            isChecked={formState.values.TASK_PRIORITY === "HIGH"}
            handleClick={() => handleClick("HIGH")}
          />
        </section>

        <Textarea
          val={formState.values.TASK_NOTES}
          name="TASK_NOTES"
          label="Notes/Description"
          placeholder="Notes..."
          handleChange={handleChange}
          handleBlur={handleBlur}
          wrap="soft"
          required={true}
          enableCharCount={true}
          maxChar={200}
          key="TASK_NOTES"
          addRequiredFlag={true}
        />

        <StatefulButton
          margins="2rem 0"
          bgcolor="hsl(222, 49%, 64%)"
          text="Save"
          action="Saving..."
          callback={submitHandler}
        />
      </form>
    </section>
  );
};

export default TaskUpdateForm;

// #PropTypes
TaskUpdateForm.propTypes = {
  selection: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  submitHandler: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired
};
