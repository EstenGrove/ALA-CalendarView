import { findStatusID, getPriorityID } from "./misc_helpers";
import { isActive, isFinal } from "./utils_status";

const taskUpdateModel = {
  currentUser: {
    userID: ""
  },
  currentResident: {
    residentID: ""
  },
  taskVals: {
    status: null,
    reason: null,
    resolution: null,
    priority: null,
    notes: null,
    followUpDate: null,
    signedBy: "",
    initialBy: null,
    completedDate: null,
    isCompleted: null,
    completedShiftID: null
  }
};

const findAndUpdateTrackingTask = (matchingRecord, formVals) => {
  return {
    ...matchingRecord,
    AssessmentTaskStatusId: findStatusID(formVals.TASK_STATUS),
    CompletedDate: new Date().toUTCString(),
    FollowUpDate: !formVals.TASK_FOLLOWUP ? "" : formVals.TASK_FOLLOWUP,
    Notes: formVals.TASK_NOTES,
    SignedBy: formVals.TASK_SIGNATURE,
    InitialBy: "NONE",
    IsCompleted: findStatusID(formVals.TASK_STATUS) !== 2 ? false : true,
    IsActive: isActive(formVals.TASK_STATUS),
    IsFinal: isFinal(formVals.TASK_STATUS)
  };
};

const updateTask = (task, formVals) => {
  const { currentUser, currentResident, taskVals } = formVals;

  return {
    ...task,
    UserId: currentUser.userID,
    ResidentId: currentResident.residentID,
    AssessmentTaskStatusId: findStatusID(taskVals.status),
    AssessmentResolutionId: 1,
    AssessmentReasonId: 6,
    AssessmentPriorityId: getPriorityID(taskVals.priority),
    Notes: taskVals.notes,
    FollowUpDate: taskVals.followUpDate,
    SignedBy: taskVals.signedBy,
    InitialBy: "",
    CompletedDate: new Date().toUTCString(),
    IsCompleted: taskVals.status === "COMPLETED" ? true : false,
    CompletedAssessmentShiftId: 4
  };
};

export { updateTask, taskUpdateModel, findAndUpdateTrackingTask };
