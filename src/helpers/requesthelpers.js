import { test } from "../auth/auth_env";
import {
  residents,
  user,
  save,
  update,
  insert,
  remove,
  tasks,
  tracking,
  assessmentTask,
  unscheduled
} from "../auth/auth_endpoints";

const makeRequest = async (
  url,
  token,
  method = "GET",
  params = {},
  callback = null
) => {
  url += "?" + new URLSearchParams(params);

  try {
    const res = await fetch(url, {
      method: method,
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const json = await res.json();
    return json && callback ? callback() : json;
  } catch (err) {
    return console.log("An error occured: " + err);
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

const saveToStorage = (key, items) =>
  window.localStorage.setItem(key, JSON.stringify(items));

const getFromStorage = (key = null) => {
  if (!key || key === "") {
    const items = { ...localStorage };
    return !items || !items.length ? {} : items;
  }
  return window.localStorage.getItem(key);
};

const clearStorage = () => window.localStorage.clear();

const mapDataToState = (data, stateObj) => {
  [stateObj] = data;
  stateObj.adls = groupBy(stateObj.ADL, adl => adl.ADLCategory);
  stateObj.careTasks = groupBy(stateObj.ADLCareTask, adl => adl.ADLCategory);
  stateObj.residents = data.residents;
  saveToStorage("state", stateObj);

  return stateObj;
};

const getResidentForTracker = async (token, residentID, dayOfWeek) => {
  let url = test.base + residents.forTracker;
  url +=
    "?" +
    new URLSearchParams({
      residentId: residentID,
      dayOfWeek: dayOfWeek
    });

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const json = await res.json();
    return json && json.Data ? json : null;
  } catch (err) {
    return console.log("An error occured: " + err);
  }
};

const getResidentProfile = async (token, residentID) => {
  let url = test.base + residents.getProfile;
  url += "?residentId=" + residentID;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return console.log("An error occured: " + err);
  }
};

const getResidentsByUser = async (token, userID) => {
  let url = test.base + residents.byUser;
  url += "?userId=" + userID;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return console.log("An error occured: " + err);
  }
};
// must pass an object as params
const getResidentsByUserEmail = async (token, params) => {
  let url = test.base + residents.byUserEmail;
  url += "?" + new URLSearchParams(params);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const json = await res.json();
    return json.Data;
  } catch (err) {
    return console.log("An error occured: " + err);
  }
};
// must pass object as params
const getResidentPhotos = async (token, params) => {
  let url = test.base + residents.photos;
  url += "?" + new URLSearchParams(params);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const json = await res.json();
    return json && json.Data ? json.Data : json;
  } catch (err) {
    return console.log("An error occured: " + err);
  }
};

const getResidentsByFacility = async (token, facilityID) => {
  let url = test.base + residents.byFacility;
  url += "?facilityId=" + facilityID;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return console.log("An error occured: " + err);
  }
};

const getUserProfile = async (token, userID) => {
  let url = test.base + user.getProfile;
  url += "?userId=" + userID;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const json = await res.json();
    const profile = await JSON.parse(json.Data);
    return profile ? profile : json;
  } catch (err) {
    return console.log("An error occured: " + err);
  }
};
const getUserProfileByEmail = async (token, email) => {
  let url = test.base + user.getProfileByEmail;
  url += "?" + new URLSearchParams({ userEmail: email });

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const json = await res.json();
    const profile = await JSON.parse(json.Data);
    return profile ? profile : json;
  } catch (err) {
    return console.log("An error occured: " + err);
  }
};

// uses the SaveAssessmentTrackingTask API
// params: {"db-meta": "Advantage", source: "AssessmentTrackingTask"}
const updateTrackingTask = async (token, params, taskToSave) => {
  let url = test.base + save.task;
  url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskToSave)
    });
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    return console.log("An error occurred ", err.message);
  }
};

// params: {index: 0, rows: 50}
const getTrackingRecords = async (token, params) => {
  let url = test.base + tracking.count;
  url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();
    return response.Data; // returns number
  } catch (err) {
    console.log("An error occurred " + err);
    return err.message;
  }
};
const countTrackingRecords = async (token, params) => {
  let url = test.base + tracking.count;
  url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();
    return response.Data; // returns number
  } catch (err) {
    console.log("An error occurred " + err);
    return err.message;
  }
};

const createNewTask = async (token, params, newTaskRecord) => {
  let url = test.base + save.task;
  url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTaskRecord)
    });
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    return console.log("An error occurred ", err.message);
  }
};

const createNewAssessmentTask = async (token, trackingRecord) => {
  let url = test.base + assessmentTask.insert;

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(trackingRecord)
    });
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log("Error occurred " + err);
    return err.message;
  }
};

const saveUnscheduledTask = async (token, params, task) => {
  let url = test.base + unscheduled.task;
  if (params) url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(task)
    });
    const response = await request.json();
    console.log("Save Unscheduled Task helper - response", response);
    return response;
  } catch (err) {
    console.log("An error occurred ", err);
    // include error fn
    return err.message;
  }
};

const saveUnscheduledTaskMany = async (token, params, tasks) => {
  let url = test.base + unscheduled.taskMany;
  if (params) url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasks)
    });
    const response = await request.json();
    console.log("Create Unscheduled TaskMany helper - response", response);
    return response;
  } catch (err) {
    console.log("An error occurred ", err);
    // include error fn
    return err.message;
  }
};

export {
  makeRequest,
  groupBy,
  clearStorage,
  getFromStorage,
  saveToStorage,
  mapDataToState,
  getUserProfile,
  getUserProfileByEmail,
  getResidentForTracker,
  getResidentProfile,
  getResidentPhotos,
  getResidentsByUser,
  getResidentsByUserEmail,
  getResidentsByFacility,
  updateTrackingTask,
  getTrackingRecords,
  countTrackingRecords,
  createNewTask,
  createNewAssessmentTask,
  saveUnscheduledTask,
  saveUnscheduledTaskMany
};
