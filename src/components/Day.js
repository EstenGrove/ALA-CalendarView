import React from "react";
import styles from "../css/Day.module.scss";
import Shift from "./Shift";
import { ADLS } from "../mockdata/ADLS";
import { groupBy } from "../helpers/requesthelpers";

const Day = ({ day }) => {
  // const { state, dispatch } = useContext(GlobalStateContext);
  // const { adls } = state;

  const tasks = groupBy(ADLS, adl => adl.ADLCategory);
  console.log(tasks);
  return (
    <div className={styles.Day}>
      <div className={styles.Day_Shift}>
        {/* GROOMING */}
        {/* GROOMING */}
        <Shift shift="A" />
        <Shift shift="A" />
        <Shift shift="A" />
      </div>
      <div className={styles.Day_Shift}>
        {/* BATHING */}
        {/* BATHING */}
      </div>
      <div className={styles.Day_Shift}>
        {/* TOILETING */}
        {/* TOILETING */}
      </div>

      <div className={styles.Day_Shift}>
        {/* LAUNDRY */}
        {/* LAUNDRY */}
      </div>
      <div className={styles.Day_Shift}>
        {/* MEALS */}
        {/* MEALS */}
      </div>
      <div className={styles.Day_Shift}>
        {/* MEDS */}
        {/* MEDS */}
      </div>
      <div className={styles.Day_Shift}>
        {/* HEALTH */}
        {/* HEALTH */}
      </div>
    </div>
  );
};

export default Day;
