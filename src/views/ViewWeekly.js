import React, { useState, useEffect, useContext } from "react";
import styles from "../css/ViewWeekly.module.scss";
import Calendar from "../components/Calendar";
import Spinner from "../components/Spinner";
import { GlobalStateContext } from "../state/GlobalStateContext";
import { AuthContext } from "../state/AuthContext";
import {
  getResidentsByUserEmail,
  saveToStorage,
  getUserProfileByEmail
} from "../helpers/requesthelpers";
import OtherTasksSection from "../components/OtherTasksSection";
import TaskSummaryPanel from "../components/TaskSummaryPanel";
import { isEmptyArray } from "../helpers/misc_helpers";
import { initialStateHydrate } from "../helpers/state_helpers";

const ViewWeekly = ({ history }) => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const { tasks, categories, currentResident } = state.globals;
  const { authData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResidentsAndUserData = async () => {
    setIsLoading(true);
    const { username, token } = authData;
    const params = { userEmail: username };
    const residentsData = await getResidentsByUserEmail(token, params);
    const userProfileData = await getUserProfileByEmail(token, username);

    const residents = await JSON.parse(residentsData);
    const newState = { ...state };
    const userProfile = userProfileData[0];
    const merged = {
      residents: residents,
      user: userProfile
    };

    const updated = initialStateHydrate(merged, state);
    saveToStorage("state", newState);
    setIsLoading(false);

    return dispatch({
      type: "SYNC_RESIDENTS_AND_USER",
      data: {
        newState: updated
      }
    });
  };

  useEffect(() => {
    if (state.globals.tasks.length !== 0) {
      return;
    }
    fetchResidentsAndUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.ViewWeekly}>
        {isLoading || state.app.isLoading ? (
          <Spinner />
        ) : (
          <>
            {!isEmptyArray(tasks) && !isEmptyArray(categories) && (
              <TaskSummaryPanel categories={categories} tasks={tasks} />
            )}
            <Calendar />
            <OtherTasksSection
              categories={state.globals.categories}
              currentResident={currentResident}
              authData={authData}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ViewWeekly;
