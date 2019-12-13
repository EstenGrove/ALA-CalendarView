import React, { useEffect } from "react";
import styles from "../css/StatusBadgeSM.module.scss";

const StatusBadgeSM = ({ status }) => {
  const statusReducer = status => {
    switch (status) {
      case "PENDING": {
        return (
          <div className={`${styles.StatusBadgeSM} ${styles.pending}`}>
            Pending
          </div>
        );
      }
      case "COMPLETE": {
        return (
          <div className={`${styles.StatusBadgeSM} ${styles.complete}`}>
            Complete
          </div>
        );
      }
      case "NOT-COMPLETE": {
        return (
          <div className={`${styles.StatusBadgeSM} ${styles.notComplete}`}>
            Not Complete
          </div>
        );
      }
      case "MISSED-EVENT": {
        return (
          <div className={`${styles.StatusBadgeSM} ${styles.missedEvent}`}>
            Missed-Event
          </div>
        );
      }
      case "IN-PROGRESS": {
        return (
          <div className={`${styles.StatusBadgeSM} ${styles.inProgress}`}>
            In-Progress
          </div>
        );
      }
      default:
        return (
          <div className={`${styles.StatusBadgeSM} ${styles.pending}`}>
            Pending
          </div>
        );
    }
  };

  useEffect(() => {
    console.log(status);
  }, [status]);

  return <>{statusReducer(status)}</>;
};

export default StatusBadgeSM;
