import React, { useState, useEffect, useContext } from "react";
import styles from "../css/Calendar.module.scss";
import { useDates } from "../utils/useDates";
import { GlobalStateContext } from "../state/GlobalStateContext";
import ResidentDetails from "./ResidentDetails";
import CalendarNav from "./CalendarNav";
import NotificationsCenter from "./NotificationsCenter";
import CalendarHeading from "./CalendarHeading";
import Week from "./Week";

const Calendar = () => {
  const { state } = useContext(GlobalStateContext);

  const [isStateLoaded, setIsStateLoaded] = useState(false);
  const [chartEntries, setChartEntries] = useState(state.globals.charting);

  const newState = { ...state };
  const { isLoading, wasUpdated } = newState.app;
  const { tasks, categories, currentResident } = newState.globals;

  const { charting } = state && state.globals;
  const {
    currentDays,
    currentWeek,
    currentMonth,
    getPrevWeek,
    getNextWeek,
    checkForSameMonth
  } = useDates();

  const alertChartingEditor = entry => {
    return console.log(entry);
  };

  useEffect(() => {
    if (isStateLoaded) {
      setChartEntries(charting);
    }
  }, [isStateLoaded, charting]);

  return (
    <>
      {state.app.hasLoaded && state.globals.currentResident.ResidentID && (
        <div className={styles.Calendar}>
          <div className={styles.Calendar_inner}>
            <>
              <ResidentDetails currentResident={currentResident} />
              <CalendarNav
                month={currentMonth}
                getNextWeek={() => getNextWeek(currentWeek.weekStart)}
                getPrevWeek={() => getPrevWeek(currentWeek.weekStart)}
              />
              <NotificationsCenter
                alertEntries={!charting ? [] : charting}
                editHandler={alertChartingEditor}
              />
              <CalendarHeading
                currentWeek={currentWeek}
                currentDays={currentDays}
                checkForSameMonth={checkForSameMonth}
              />
              <Week
                currentDays={currentDays}
                isLoading={isLoading}
                wasUpdated={wasUpdated}
                categories={categories}
                tasks={tasks}
              />
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
