import React, { useContext } from "react";
import styles from "../css/ADLByDay.module.scss";
import { PropTypes } from "prop-types";
import Shift from "./Shift";
import {
  isEmptyArray,
  isEmptyObj,
  getCategoryID
} from "../helpers/misc_helpers";
import { AssessmentUnscheduleTask } from "../helpers/data_models";

const ADLByDay = React.memo(({ tasks = [], categories, modalHandler, day }) => {
  // MAP THRU ADL CATEGORIES AND CHECK FOR TASKS AVAILABLE BY CATEGORY
  // IF NO TASKS THEN RENDER A FALLBACK UI
  // ELSE PASS THE TASK(S) TO THE <SHIFT/>
  const generateUI = (adlCategories, activeDay) => {
    return adlCategories.map((adl, index) => {
      const task = tasks.filter(
        task =>
          task.ADLCategory === adl.AdlCategoryType &&
          task.DayOfWeek === activeDay
      );
      if (isEmptyArray(task)) {
        const unscheduledTask = {
          ...AssessmentUnscheduleTask,
          ResidentId: 0,
          AssessmentTaskId: null,
          AssessmentCategoryId: getCategoryID(adl.AdlCategoryType),
          AssessmentTaskStatusId: null,
          AssessmentReasonId: 0,
          AssessmentResolutionId: 0,
          CompletedAssessmentShiftId: 0
        };
        return (
          <div
            className={styles.Day_Shift}
            data-day={activeDay}
            data-category={adl.AdlCategoryType}
            key={`${adl.AdlCategoryType}_${index}`}
          >
            <Shift
              status={"NO-TASK"}
              shift="AM"
              ADL={adl.AdlCategoryType}
              day={activeDay}
              task={unscheduledTask}
              modalHandler={() => modalHandler(unscheduledTask)}
            />
            <Shift
              status={"NO-TASK"}
              shift="PM"
              ADL={adl.AdlCategoryType}
              day={activeDay}
              task={unscheduledTask}
              modalHandler={() => modalHandler(unscheduledTask)}
            />
            <Shift
              status={"NO-TASK"}
              shift="NOC"
              ADL={adl.AdlCategoryType}
              day={activeDay}
              task={unscheduledTask}
              modalHandler={() => modalHandler(unscheduledTask)}
            />
          </div>
        );
      }
      return (
        <div
          className={styles.Day_Shift}
          data-day={activeDay}
          data-category={adl.AdlCategoryType}
          key={`${adl.AdlCategoryType}_${index}`}
        >
          <Shift
            status={task[0].TaskStatus}
            shift="AM"
            ADL={adl.AdlCategoryType}
            day={activeDay}
            task={task[0]}
            modalHandler={() => modalHandler(task[0])}
          />
          <Shift
            status={task[0].TaskStatus}
            shift="PM"
            ADL={adl.AdlCategoryType}
            day={activeDay}
            task={task[0]}
            modalHandler={() => modalHandler(task[0])}
          />
          <Shift
            status={task[0].TaskStatus}
            shift="NOC"
            ADL={adl.AdlCategoryType}
            day={activeDay}
            task={task[0]}
            modalHandler={() => modalHandler(task[0])}
          />
        </div>
      );
    });
  };

  return (
    <div className={styles.Day} data-day={day}>
      {generateUI(categories, day)}
    </div>
  );
});

export default ADLByDay;

ADLByDay.defaultProps = {
  tasks: []
};

ADLByDay.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  modalHandle: PropTypes.func,
  day: PropTypes.string.isRequired
};
