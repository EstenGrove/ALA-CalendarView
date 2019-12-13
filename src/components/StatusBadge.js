import React, { useEffect } from "react";
import styles from "../css/StatusBadge.module.scss";

const StatusBadge = ({ status }) => {
  const statusReducer = status => {
    switch (status) {
      case "PENDING": {
        return (
          <div className={`${styles.StatusBadge} ${styles.pending}`}>
            Pending
          </div>
        );
      }
      case "COMPLETE": {
        return (
          <div className={`${styles.StatusBadge} ${styles.complete}`}>
            Complete
          </div>
        );
      }
      case "NOT-COMPLETE": {
        return (
          <div className={`${styles.StatusBadge} ${styles.notComplete}`}>
            Not Complete
          </div>
        );
      }
      case "MISSED-EVENT": {
        return (
          <div className={`${styles.StatusBadge} ${styles.missedEvent}`}>
            Missed-Event
          </div>
        );
      }
      case "IN-PROGRESS": {
        return (
          <div className={`${styles.StatusBadge} ${styles.inProgress}`}>
            In-Progress
          </div>
        );
      }
      default:
        return (
          <div className={`${styles.StatusBadge} ${styles.pending}`}>
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

export default StatusBadge;
