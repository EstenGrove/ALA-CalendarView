import React, { useEffect, useState } from "react";
import styles from "../css/NotificationsCenter.module.scss";
import sprite from "../assets/all.svg";
import { format } from "date-fns";
import { slicer, nullHandler } from "../helpers/misc_helpers";

const AlertChartEntry = ({ entry, editHandler }) => {
  return (
    <div className={styles.AlertChartEntry}>
      <div className={styles.AlertChartEntry_inner}>
        <div className={styles.AlertChartEntry_inner_item}>
          <svg
            className={styles.AlertChartEntry_inner_item_icon}
            style={{ fill: "hsla(218, 17%, 35%, 1)" }}
          >
            <use xlinkHref={`${sprite}#icon-drive_file_rename_outline`}></use>
          </svg>
        </div>
        <div className={styles.AlertChartEntry_inner_item}>
          <svg
            className={styles.AlertChartEntry_inner_item_icon}
            style={{ fill: "hsla(170, 100%, 39%, 1)" }}
          >
            <use xlinkHref={`${sprite}#icon-check`}></use>
          </svg>
        </div>
        <div className={styles.AlertChartEntry_inner_item}>
          {format(nullHandler(entry.EntryDate), "MM/DD/YYYY")}
        </div>
        <div className={styles.AlertChartEntry_inner_item}>
          {slicer(nullHandler(entry.EntryTopic), 20)}
        </div>
        <div className={styles.AlertChartEntry_inner_item}>
          {slicer(nullHandler(entry.EntryText), 50)}
        </div>
        <div className={styles.AlertChartEntry_inner_item}>
          <svg className={styles.AlertChartEntry_inner_item_icon}>
            <use xlinkHref={`${sprite}#icon-delete`}></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

const NotificationsCenter = ({ alertEntries }) => {
  const [hasAlertCharting, setHasAlertCharting] = useState(false);
  const [openAlerts, setOpenAlerts] = useState(false); // expands the section

  useEffect(() => {
    if (alertEntries && alertEntries.length > 1) {
      setHasAlertCharting(true);
    }
  }, [alertEntries]);
  return (
    <div
      className={
        openAlerts
          ? `${styles.NotificationsCenter} ${styles.NotificationsCenter_open}`
          : styles.NotificationsCenter
      }
    >
      <div className={styles.NotificationsCenter_container}>
        <svg
          className={
            hasAlertCharting
              ? styles.NotificationsCenter_container_icon_active
              : styles.NotificationsCenter_container_icon
          }
          onClick={() => setOpenAlerts(!openAlerts)}
        >
          <use xlinkHref={`${sprite}#icon-bell`}></use>
        </svg>
        <div className={styles.NotificationsCenter_container_center}>
          Alert Charting
        </div>
        <svg
          className={
            openAlerts
              ? `${styles.NotificationsCenter_container_icon} ${styles.chevron} ${styles["rotate-center"]}`
              : `${styles.NotificationsCenter_container_icon} ${styles.chevron}`
          }
          onClick={() => setOpenAlerts(!openAlerts)}
        >
          <use xlinkHref={`${sprite}#icon-chevron-small-down`}></use>
        </svg>
      </div>

      <section
        className={
          openAlerts
            ? `${styles.NotificationsCenter_data} ${styles.data}`
            : styles.NotificationsCenter_data
        }
      >
        <div className={styles.NotificationsCenter_data_status}>
          Status:{" "}
          {hasAlertCharting ? (
            <span style={{ color: "hsla(170, 100%, 39%, 1)" }}>Active</span>
          ) : (
            <span style={{ color: "hsla(352, 70%, 50%, 1)" }}>Inactive</span>
          )}
        </div>
        <div className={styles.NotificationsCenter_data_details}>
          <h4 className={styles.NotificationsCenter_data_details_heading}>
            Entries
          </h4>
          <ul className={styles.Notifications_center_data_details}>
            {alertEntries && alertEntries.length > 1
              ? alertEntries.map((entry, index) => (
                  <AlertChartEntry
                    entry={entry}
                    key={entry.EntryDate} // change this to a different property later
                  />
                ))
              : "NO ENTRIES"}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default NotificationsCenter;
