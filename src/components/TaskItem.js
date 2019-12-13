import React from "react";
import { PropTypes } from "prop-types";
import styles from "../css/TaskItem.module.scss";
import { format } from "date-fns";
import sprite from "../assets/sprite.svg";
import {
  replaceNullWithMsg,
  addEllipsis,
  iconsReducer
} from "../helpers/misc_helpers";
import StatusBadgeSM from "./StatusBadgeSM";

const TaskItem = ({ task, handleCheckbox }) => {
  const formatDate = (date = null) => {
    if (!date) return "No date";
    const day = format(date, "ddd");
    const dayDate = format(date, "D");
    const month = format(date, "MMM");
    const year = format(date, "YYYY");
    return `${day} ${month} ${dayDate} ${year}`;
  };

  return (
    <div className={styles.TaskItem}>
      <div className={styles.TaskItem_inner}>
        {/* ICON & CATEGORY */}
        <section className={styles.TaskItem_inner_top}>
          <div>
            <svg
              className={styles.TaskItem_inner_top_icon}
              style={iconsReducer(task.ADLCategory).styles}
            >
              <use
                xlinkHref={`${sprite}#icon-${
                  iconsReducer(task.ADLCategory).icon
                }`}
              ></use>
            </svg>
          </div>
          <div className={styles.TaskItem_inner_top_adl}>
            {replaceNullWithMsg(task.ADLCategory, "None")}
          </div>
        </section>
        {/* DESC */}
        <section className={styles.TaskItem_inner_middle}>
          <div className={styles.TaskItem_inner_middle_heading}>
            Description
          </div>
          <div className={styles.TaskItem_inner_middle_desc}>
            {addEllipsis(
              replaceNullWithMsg(task.TaskDescription, "No description"),
              30
            )}
          </div>
          <div className={styles.TaskItem_inner_middle_right}>
            <div className={styles.TaskItem_inner_middle_right_shift}>
              <i>
                Shift{" "}
                <b style={{ color: "#333" }}>
                  {replaceNullWithMsg(task.Shift, "ANY")}
                </b>
              </i>
            </div>
          </div>
        </section>
        <section className={styles.TaskItem_inner_bottom}>
          <div className={styles.TaskItem_inner_bottom_left}>
            <StatusBadgeSM status={task.TaskStatus} />
          </div>
          <div className={styles.TaskItem_inner_bottom_right}>
            <span className={styles.TaskItem_inner_bottom_right_text}>
              DUE DATE
            </span>
            <svg className={styles.TaskItem_icon}>
              <use xlinkHref={`${sprite}#icon-calendar1`}></use>
            </svg>
            <span className={styles.TaskItem_inner_bottom_right_item}>
              {formatDate(task.TrackDate)}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TaskItem;

TaskItem.propTypes = {
  task: PropTypes.object,
  handleCheckbox: PropTypes.func // might not be needed yet
};
