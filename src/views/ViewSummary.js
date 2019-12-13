import React, { useContext } from "react";
import styles from "../css/ViewSummary.module.scss";
import { GlobalStateContext } from "../state/GlobalStateContext";
import ViewSummaryHeading from "../components/ViewSummaryHeading";
import ViewSummaryVitals from "../components/ViewSummaryVitals";
import ViewSummaryTasks from "../components/ViewSummaryTasks";
import ViewSummaryOverview from "../components/ViewSummaryOverview";

const ViewSummary = () => {
  const { state } = useContext(GlobalStateContext);
  const {
    currentResident,
    categories,
    tasks,
    trackingTasks,
    charting
  } = state.globals;
  return (
    <div className={styles.ViewSummary}>
      <ViewSummaryHeading currentResident={currentResident} />
      <ViewSummaryVitals charting={charting} categories={categories} />
      <ViewSummaryTasks
        categories={categories}
        tasks={tasks}
        trackingTasks={trackingTasks}
      />
      <ViewSummaryOverview
        currentResident={currentResident}
        categories={categories}
        charting={charting}
        tasks={tasks}
        trackingTasks={trackingTasks}
      />
    </div>
  );
};

export default ViewSummary;
