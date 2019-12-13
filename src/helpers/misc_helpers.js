///////////////////////////////////////////////////
////////////////// MISC GENERATORS ///////////////
//////////////////////////////////////////////////

const keyGenerator = () => {
  return Math.random()
    .toString(36)
    .substr(2, 5);
};

const numGen = (min, max) => Math.round(Math.random() * (max - min) + min);

//////////////////////////////////////////////////
////////////////// STRING HELPERS ////////////////
/////////////////////////////////////////////////
const slicer = (val, maxLength) => {
  if (!val || val.length <= 0) {
    return "N/A";
  }
  if (val.length < maxLength) return val.toUpperCase();
  return val.slice(0, maxLength) + "...";
};

const addEllipsis = (val, desiredLength) => {
  if (val.length <= desiredLength) return val;
  return val.slice(0, desiredLength) + "...";
};

//////////////////////////////////////////////////
///////////// NULL/EMPTY VALUE HELPERS ///////////
/////////////////////////////////////////////////

const typeCheck = val => {
  return val.constructor.name;
};

const nullHandler = val => {
  return !val ? "N/A" : val;
};

const isNull = val => {
  return val === null || !val ? true : false;
};

const isPropertyEmpty = (obj, propName) => {
  if (!obj.hasOwnProperty(propName)) return true;
  return !obj[propName] || obj[propName] === undefined || obj[propName] === null
    ? true
    : false;
};

const isEmpty = val => {
  return !val || val === undefined || val === null || val === "" ? true : false;
};

const isEmptyObj = obj => {
  if (obj === null) return true;
  if (obj === undefined) return true;
  if (obj !== undefined && Object.keys(obj).length === 0) return true;
  return false;
};

const isEmptyArray = arr => {
  if (!Array.isArray(arr)) return `NOT AN ARRAY: ${typeof arr}`;
  if (!arr || arr === null || arr.length === 0) return true;
  return false;
};

const checkForArray = arr => {
  if (!Array.isArray(arr)) return `NOT AN ARRAY: ${typeof arr}`;
  return true;
};

const replaceNullWithMsg = (val, msg) => {
  if (!val || val === null) return msg;
  return val;
};

//////////////////////////////////////////////////
/////////////// CALCULATION HELPERS /////////////
/////////////////////////////////////////////////
// getPercentage(100, 10); // 10%
const getPercentage = (count, completed) => {
  return Math.round(((completed / count) * 100).toFixed(2)) + "%";
};
const getAvg = arr => arr.reduce((acc, cur) => acc + cur / arr.length, 0);

// get various counts: COMPLETED, PENDING, NOT-COMPLETE, MISSED-EVENT
const getCount = (tasks, status) => {
  return tasks.filter((task, index) => task.TaskStatus === status).length;
};
// pass a condition you DONT wont to match (ie all that DONT meet condition)
const getRemaining = (list, condition) => {
  return list.filter((item, index) => item.TaskStatus !== condition).length;
};

//////////////////////////////////////////////////
/////////////// STRINGIFY HELPERS /////////////
/////////////////////////////////////////////////
const serializer = params => {
  if (!params) return console.log("Empty params data", params);
  return Object.keys(params)
    .map((key, index) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
};

//////////////////////////////////////////////////
/////////////// ADL CATEGORY HELPERS /////////////
//////////////////////////////////////////////////
const getObjKeys = obj => Object.keys(obj);
const getObjVals = obj => Object.values(obj);

// returns id from category name
const findCategoryID = (category, levels) => {
  return levels.reduce((acc, cur) => {
    if (cur.AdlCategoryType === category) {
      acc = cur.AdlCategoryId;
      return cur.AdlCategoryId;
    }
    return acc;
  }, {});
};

// returns category name from id
const findCategoryByID = (id, levels) => {
  return levels.reduce((acc, cur) => {
    if (cur.AdlCategoryId === id) {
      acc = cur.AdlCategoryType;
      return cur.AdlCategoryType;
    }
    return acc;
  }, {});
};

const getCategoryID = category => {
  const name = checkCategoryNaming(category);
  switch (name) {
    case "ALL" || "All":
      return 1;
    case "Ambulate":
      return 2;
    case "Bathing":
      return 3;
    case "Dressing":
      return 4;
    case "Grooming":
      return 5;
    case "Laundry":
      return 6;
    case "Meals":
      return 7;
    case "MedAssist":
      return 8;
    case "Meds":
      return 8;
    case "Psychosocial":
      return 9;
    case "SpecialCare":
      return 10;
    case "StatusChecks":
      return 11;
    case "Toileting":
      return 12;
    case "Transfers":
      return 13;
    case "Other":
      return 14;
    default:
      return 14;
  }
};
const getCategoryNameFromID = name => {
  switch (name) {
    case 1:
      return "All";
    case 2:
      return "Ambulate";
    case 3:
      return "Bathing";
    case 4:
      return "Dressing";
    case 5:
      return "Grooming";
    case 6:
      return "Laundry";
    case 7:
      return "Meals";
    case "MedAssist" || "Meds":
      return 8;
    case 9:
      return "Psychosocial";
    case 10:
      return "SpecialCare";
    case 11:
      return "StatusChecks";
    case 12:
      return "Toileting";
    case 13:
      return "Transfers";
    case 14:
      return "Other";
    default:
      return 14;
  }
};

// returns matching category name from legacy
const checkCategoryNaming = category => {
  const lowerCaseADL = category.toLowerCase();
  if (!lowerCaseADL || lowerCaseADL === undefined || lowerCaseADL === "")
    return;

  if (lowerCaseADL === ("medassist" || "meds" || "medication")) {
    return "Meds";
  }

  if (lowerCaseADL === ("statuschecks" || "health")) {
    return "Health";
  }
  if (lowerCaseADL === ("ambulation" || "ambulate")) {
    return "Ambulate";
  }
  if (lowerCaseADL === ("groom" || "grooming")) {
    return "Grooming";
  }
  if (lowerCaseADL === ("toilet" || "toileting")) {
    return "Toileting";
  }
  if (lowerCaseADL === ("transfer" || "transfers")) {
    return "Transfers";
  }
  if (lowerCaseADL === ("care" || "specialcare")) {
    return "Care";
  }
  // *addition*
  if (lowerCaseADL === ("health" || "statuschecks")) {
    return "Health";
  }
  if (lowerCaseADL === "psychosocial" || lowerCaseADL === "mental") {
    return "Mental";
  }
  if (lowerCaseADL === ("bath" || "bathing")) {
    return "Bathing";
  }
  return category;
};

const iconsReducer = type => {
  switch (true) {
    case type === "Dressing" || type === "Dress": {
      return {
        icon: "accessibility",
        styles: {
          fill: "hsla(268, 10%, 30%, .2)"
        }
      };
    }
    case type === "Grooming" || type === "Groom": {
      return {
        icon: "face",
        styles: {
          fill: "hsla(144, 69%, 63%, .4)"
        }
      };
    }
    case type === "Bathing" || type === "Bath": {
      return {
        icon: "bathtub",
        styles: {
          fill: "hsla(222, 89%, 64%, .3)"
        }
      };
    }
    case type === "MedAssist" || type === "Meds": {
      return {
        icon: "sentiment_very_dissatisfied",
        styles: {
          fill: "hsla(330, 100%, 41%, .22)"
        }
      };
    }
    case type === "Psychosocial" || type === "Mental": {
      return {
        icon: "news",
        styles: {
          fill: "hsla(11, 100%, 75%, .4)"
        }
      };
    }
    case type === "StatusChecks" || type === "Health": {
      return {
        icon: "timer",
        styles: {
          fill: "hsla(259, 77%, 64%, .4)"
        }
      };
    }
    case type === "Toileting" || type === "Toilet": {
      return {
        icon: "",
        styles: {
          fill: ""
        }
      };
    }
    case type === "SpecialCare" || type === "Care": {
      return {
        icon: "",
        styles: {
          fill: ""
        }
      };
    }
    case type === "Ambulation" || type === "Ambulate": {
      return {
        icon: "bus_alert",
        styles: {
          fill: "hsla(330, 100%, 41%, .22)"
        }
      };
    }
    case type === "Transfers": {
      return {
        icon: "transfer_within_a_station",
        styles: {
          fill: "hsla(268, 10%, 30%, .2)"
        }
      };
    }
    case type === "Laundry": {
      return {
        icon: "local_laundry_service",
        styles: {
          fill: "hsla(197, 100%, 50%, .3)"
        }
      };
    }
    case type === "Meals": {
      return {
        icon: "restaurant",
        styles: {
          fill: "hsla(259, 77%, 64%, .4)"
        }
      };
    }
    case type === "All": {
      return {
        icon: "perm_contact_calendar",
        styles: {
          fill: "hsla(218, 17, 65, 1)"
        }
      };
    }
    case type === "Other": {
      return {
        icon: "assignment_ind",
        styles: {
          fill: "hsla(218, 17, 65, 1)"
        }
      };
    }
    default:
      return new Error("Category type not recognized");
  }
};

//////////////////////////////////////////////////
/////////////// TASK STATUS HELPERS //////////////
//////////////////////////////////////////////////
const findStatusID = status => {
  switch (status) {
    case "PENDING":
      return 1;
    case "COMPLETE":
      return 2;
    case "MISSED-EVENT":
      return 3;
    case "NOT-COMPLETE":
      return 4;
    case "IN-PROGRESS":
      return 5;
    default:
      return 1;
  }
};

const findStatusName = id => {
  switch (id) {
    case 1:
      return "PENDING";
    case 2:
      return "COMPLETE";
    case 3:
      return "MISSED-EVENT";
    case 4:
      return "NOT-COMPLETE";
    case 5:
      return "IN-PROGRESS";
    default:
      return "PENDING";
  }
};

const groupBy = (list, iteratee) => {
  return list.reduce((acc, item) => {
    const keyToSortBy = iteratee(item);
    if (!acc[keyToSortBy]) {
      acc[keyToSortBy] = [];
    }
    acc[keyToSortBy].push(item);
    return acc;
  }, {});
};

const getPriorityID = priority => {
  switch (priority) {
    case "NONE":
      return 0;
    case "LOW":
      return 1;
    case "MEDIUM":
      return 2;
    case "HIGH":
      return 3;
    case "URGENT":
      return 5;
    default:
      return 0;
  }
};

//////////////////////////////////////////////////
////////////////// STATE HELPERS /////////////////
//////////////////////////////////////////////////

//////////////////////////////////////////////////
////////////////// TASK HELPERS /////////////////
//////////////////////////////////////////////////
// accepts (tasks </Array>) && (stateObj </Object>)
const reorgTasks = (tasks, stateObj) => {
  // if (typeof tasks === "object" && isEmptyObj(tasks)) return {};
  const byCategory = groupBy(tasks, task => task.ADLCategory);
  const keys = getObjKeys(byCategory);
  // maps to state by category then by day
  return keys.map((adl, index) => {
    stateObj[adl] = groupBy(byCategory[adl], x => x.DayOfWeek);
    return stateObj;
  });
};
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const taskHandler = (tasks, category, day, state) => {
  const sortByDay = (tasks, day) => {
    return tasks.filter((task, index) => task.DayOfWeek === day);
  };
  const byCategory = groupBy(tasks, x => x.ADLCategory);
  if (byCategory[category] === undefined) return;
  return state[category][day].push(sortByDay(byCategory[category], day));
};

const findTaskRecordByID = (activeTask, trackingRecords) => {
  const matchingRecord = trackingRecords.filter((record, index) => {
    if (activeTask.AssessmentTrackingId === record.AssessmentTrackingId) {
      return record;
    }
    return null;
  });
  const [current] = matchingRecord;
  return current;
};

const findTask = (tasks, adl, day) => {
  console.group("findTask");
  console.log("tasks", tasks);
  console.log("adl", adl);
  console.log("day", day);
  console.groupEnd();
  return tasks.filter(
    (task, index) => task.ADLCategory === adl && task.DayOfWeek === day
  );
};

const sortTasks = (tasks, stateObj) => {
  const items = groupBy(tasks, task => task.ADLCategory);
  stateObj.globals.sorted = items;
  return items;
};

//////////////////////////////////////////////////
////////////////// UPDATE HELPERS /////////////////
//////////////////////////////////////////////////
const findAndUpdateTask = (matchingRecord, formVals) => {
  matchingRecord.AssessmentTaskStatusId = findStatusID(formVals.TASK_STATUS);
  matchingRecord.CompletedDate = new Date();
  matchingRecord.FollowUpDate = !formVals.TASK_FOLLOWUP
    ? ""
    : formVals.TASK_FOLLOWUP;
  matchingRecord.Notes = formVals.TASK_NOTES;
  matchingRecord.SignedBy = formVals.TASK_SIGNATURE;
  matchingRecord.InitialBy = "NONE";
  matchingRecord.IsCompleted = true;
  matchingRecord.IsActive = true;
  matchingRecord.IsFinal = matchingRecord.FollowUpDate !== "" ? true : false;
  return matchingRecord;
};

const getAssessmentReasonID = reason => {
  switch (reason) {
    case "COMPLETED-ON-LATER-SHIFT":
      return 1;
    case "CANCELLED-BY-SUPERVISOR":
      return 2;
    case "NOT-NEEDED":
      return 3;
    case "MISSED-FORGOTTEN":
      return 4;
    case "INSUFFICIENT-TIME-TO-COMPLETE":
      return 5;
    case "COMPLETED-AS-SCHEDULED":
      return 6;
    case "NOT-COMPLETED":
      return 7;
    case "MISSED":
      return 8;
    case "FORGOTTEN":
      return 9;
    default:
      return 7;
  }
};
const getAssessmentResolutionID = reason => {
  switch (reason) {
    case "COMPLETED":
      return 1;
    case "COMPLETED-REASSESSMENT-NEEDED":
      return 2;
    case "TBC-NEXT-SHIFT":
      return 3;
    case "RESIDENT-DENIED":
      return 4;
    case "CANCELLED-BY-SUPERVISOR":
      return 5;
    case "PENDING":
      return 6;
    case "TBC-NEXT-SHIFT-NEEDS":
      return 7;
    default:
      return 6;
  }
};

// find shiftID
const findShiftID = shift => {
  if (shift === "AM") return 1;
  if (shift === "PM") return 2;
  if (shift === "NOC") return 3;
  return 4; // all
};

const findResolutionID = status => {
  // tbd
};

export {
  iconsReducer,
  numGen,
  typeCheck,
  isNull,
  serializer,
  keyGenerator,
  isPropertyEmpty,
  checkForArray,
  isEmpty,
  isEmptyObj,
  isEmptyArray,
  getAvg,
  getPercentage,
  getRemaining,
  getCount,
  nullHandler,
  slicer,
  addEllipsis,
  days,
  findTask,
  reorgTasks,
  sortTasks,
  replaceNullWithMsg,
  taskHandler,
  getObjKeys,
  getObjVals,
  findStatusID,
  findStatusName,
  findCategoryID,
  findCategoryByID,
  checkCategoryNaming,
  findTaskRecordByID,
  findAndUpdateTask,
  getCategoryID,
  getCategoryNameFromID,
  findShiftID,
  findResolutionID,
  getPriorityID,
  getAssessmentReasonID,
  getAssessmentResolutionID
};
