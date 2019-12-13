import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import styles from "../css/ResidentDetails.module.scss";
import sprite from "../assets/all.svg";
import { slicer } from "../helpers/misc_helpers";
import { format } from "date-fns";

const ResidentDetails = ({ currentResident }) => {
  const [activeResident, setActiveResident] = useState(currentResident);

  useEffect(() => {
    setActiveResident(currentResident);
  }, [currentResident]);

  return (
    <section className={styles.ResidentDetails}>
      <div className={styles.ResidentDetails_imgWrapper}>
        {!activeResident.residentPhoto ? (
          <svg className={styles.ResidentDetails_imgWrapper_noPhoto}>
            <use xlinkHref={`${sprite}#icon-person`}></use>
          </svg>
        ) : (
          <img
            src={activeResident && activeResident.residentPhoto}
            alt="Intake shot of resident"
            className={styles.ResidentDetails_imgWrapper_img}
          />
        )}
      </div>

      <div className={styles.ResidentDetails_resInfo}>
        <h3 className={styles.ResidentDetails_resInfo_name}>
          {(activeResident &&
            activeResident.FirstName + " " + activeResident.LastName) ||
            "No resident selected"}
        </h3>
        <h5 className={styles.ResidentDetails_resInfo_age}>
          Age: {activeResident.Age ? activeResident.Age : "N/A"}
        </h5>
        <h5 className={styles.ResidentDetails_resInfo_unit}>
          Unit: {activeResident.Unit ? activeResident.Unit : "N/A"}
        </h5>
      </div>

      <div className={styles.ResidentDetails_extra}>
        <div className={styles.ResidentDetails_extra_stats}>
          <h6 className={styles.ResidentDetails_extra_stats_title}>
            Height/Weight
          </h6>
          <p className={styles.ResidentDetails_extra_stats_value}>
            <b>Height: </b>
            {activeResident.Height ? activeResident.Height : "N/A"} inches.
          </p>
          <p className={styles.ResidentDetails_extra_stats_value}>
            <b>Weight: </b>
            {activeResident.Weight ? activeResident.Weight : "N/A"} lbs.
          </p>
        </div>

        <div className={styles.ResidentDetails_extra_dueDates}>
          <h6 className={styles.ResidentDetails_extra_stats_title}>
            Due Dates
          </h6>
          <p className={styles.ResidentDetails_extra_stats_value}>
            <b>Annual ISP: </b>
            {activeResident.height ? activeResident.height : "N/A"}
          </p>
          <p className={styles.ResidentDetails_extra_stats_value}>
            <b>SVC Plan: </b>
            {activeResident.ServicePlanDue
              ? format(activeResident.ServicePlanDue, "MM/DD/YYYY")
              : "N/A"}
          </p>
          <p className={styles.ResidentDetails_extra_stats_value}>
            <b>MD Review: </b>
            {activeResident.MDReportDue
              ? format(activeResident.MDReportDue, "MM/DD/YYYY")
              : "N/A"}
          </p>
        </div>

        <div className={styles.ResidentDetails_extra_notes}>
          <h6 className={styles.ResidentDetails_extra_stats_title}>Details</h6>
          <p className={styles.ResidentDetails_resCareNotes_notes}></p>
          Code Status:{" "}
          {activeResident.CodeStatus
            ? slicer(activeResident.CodeStatus, 25)
            : "Unknown"}
        </div>
      </div>
      <div className={styles.ResidentDetails_more}>More Details</div>
    </section>
  );
};

export default ResidentDetails;

ResidentDetails.propTypes = {
  currentResident: PropTypes.object
};
