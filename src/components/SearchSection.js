import React, { useState, useContext } from "react";
import styles from "../css/SearchSection.module.scss";
import sprite from "../assets/all.svg";
import { GlobalStateContext } from "../state/GlobalStateContext";
import {
  days,
  taskHandler,
  isEmptyArray,
  isEmptyObj
} from "../helpers/misc_helpers";
import {
  groupBy,
  getResidentForTracker,
  getResidentProfile,
  saveToStorage
} from "../helpers/requesthelpers";
import { AuthContext } from "../state/AuthContext";
import StatefulButton from "./StatefulButton";
import Placeholder from "./Placeholder";
import Spinner from "./Spinner";

const btnStyles = {
  marginLeft: "auto",
  borderRadius: "0 .5rem .5rem 0"
};

const SearchSection = React.memo(
  ({ id, name = "currentResident", title = null, options }) => {
    const { state, dispatch } = useContext(GlobalStateContext);
    const { authData } = useContext(AuthContext);
    const newState = { ...state };
    const [currentResident, setCurrentResident] = useState(
      state.globals.currentResident
    );

    const selectResident = e => {
      const { value } = e.target;

      if (!value.length) {
        return setCurrentResident({
          Age: null,
          FirstName: null,
          LastName: null,
          ResidentID: null
        });
      }
      const id = value && Number(value.split("~")[1].trimStart());
      const [activeResident] = state.residents.filter(
        (resident, index) => resident.ResidentID === id
      );

      setCurrentResident({
        Age: activeResident.Age,
        FirstName: activeResident.FirstName,
        LastName: activeResident.LastName,
        ResidentID: activeResident.ResidentID
      });
      return dispatch({
        type: "CHANGE_RESIDENT",
        data: {
          currentResident: activeResident
        }
      });
    };

    // load resident data: getResidentForTracker, getResidentProfile
    const loadResident = async e => {
      e.preventDefault();
      dispatch({
        type: "LOADING_STATE"
      });
      if (!currentResident || !currentResident.ResidentID) {
        alert("Please select a resident");
        return false;
      }
      const profileData = await getResidentProfile(
        authData.token,
        currentResident.ResidentID
      );
      const data = await getResidentForTracker(
        authData.token,
        currentResident.ResidentID,
        0
      );

      // const DATA = await JSON.parse(data.Data);
      const response = data.Data;
      console.group("SearchSection");
      console.log("Profile", profileData);
      console.log("Tracker Data", data);
      console.log("Response Data (tracker)", data);
      console.groupEnd();
      // clone global state and update values
      // then save to localStorage & global state
      const categories = [...response.ADLCareLevel];
      const careTasks = [...response.ADLCareTask];
      const { parsedTasks } = newState.globals;
      // push tasks to state if no tasks exists return state
      for (let i = 0; i < categories.length; i++) {
        days.map((day, index) => {
          return taskHandler(
            careTasks,
            categories[i].AdlCategoryType,
            day,
            parsedTasks
          );
        });
      }

      const updatedState = {
        ...newState,
        globals: {
          adls: response.ADL,
          tasks: response.ADLCareTask.length === 0 ? [] : response.ADLCareTask,
          parsedTasks: parsedTasks,
          trackingTasks: profileData.Data.AssessmentTrackingTasks,
          charting: profileData.Data.Charts,
          categories: response.ADLCareLevel,
          currentResident: {
            ...currentResident,
            Unit: profileData.Data.Residents[0].FloorUnit,
            CodeStatus: profileData.Data.Residents[0].CodeStatus,
            Height: response.Resident[0].Height,
            Weight: response.Resident[0].Weight,
            MDReportDue: response.Resident[0].MDReportDue,
            ServicePlanDue: response.Resident[0].ServicePlanDue,
            Allergies: profileData.Data.Residents[0].MedAllergies
          },
          profile: profileData.Data
        }
      };
      console.log("UPDATEDSTATE-SEARCHSECTION", updatedState);
      sortTasks(updatedState.globals.adls, updatedState);

      saveToStorage("state", updatedState);
      return dispatch({
        type: "LOAD_RESIDENT_DATA",
        data: {
          newState: updatedState
        }
      });
    };

    // sorts the DATA[0].ADL NOT THE TASKS
    const sortTasks = (tasks, stateObj) => {
      const items = groupBy(tasks, task => task.ADLCategory);
      stateObj.globals.sorted = items;
      saveToStorage("state", stateObj);
      return items;
    };

    // useEffect(() => {
    //   // "watch" currentResident and update global state
    //   // state.globals.currentResident = currentResident;

    //   setCurrentResident(state.globals.currentResident);
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [state.globals.currentResident]);

    if (state.globals.residents && state.globals.residents.length === 0) {
      return <Spinner />;
    }
    if (
      isEmptyObj(state.globals.currentResident) ||
      !state.globals.currentResident
    ) {
      return <Placeholder msg="PLEASE SELECT A RESIDENT" />;
    }
    return (
      <>
        {isEmptyArray(state.globals.residents) && (
          <Placeholder msg="PLEASE SELECT A RESIDENT" />
        )}
        <div className={styles.SearchSection}>
          <h4 className={styles.SearchSection_title}>{title}</h4>
          <div className={styles.SearchSection_form}>
            <div className={styles.SearchSection_form_iconInput}>
              <svg className={styles.SearchSection_form_icon}>
                <use xlinkHref={`${sprite}#icon-magnifying-glass`} />
              </svg>
              <input
                list={id}
                type="search"
                name={name}
                className={styles.SearchSection_form_search}
                placeholder="Find a resident..."
                required
                onChange={selectResident}
              />
              <datalist id={id} className={styles.dropdownList}>
                {state &&
                  state.residents &&
                  state.residents.map((option, index) => (
                    <option
                      value={
                        option.FirstName +
                        " " +
                        option.LastName +
                        " ~ " +
                        (!option.ResidentID ? "" : option.ResidentID)
                      }
                      key={index}
                      className={styles.dropdown_option}
                    />
                  ))}
              </datalist>
              <div style={{ marginLeft: "auto" }}>
                <StatefulButton
                  action="Loading..."
                  text="Load"
                  callback={e => loadResident(e)}
                  customStyles={btnStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);
export default SearchSection;
