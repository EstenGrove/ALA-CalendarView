import React, { useEffect, useContext, useState } from "react";
import styles from "../css/AppHeader.module.scss";
import sprite from "../assets/all.svg";
import Modal from "./Modal";
import SearchSection from "./SearchSection";
import { GlobalStateContext } from "../state/GlobalStateContext";
import { getFromStorage } from "../helpers/requesthelpers";
import { AuthContext } from "../state/AuthContext";

const AppHeader = ({ currentResident, residentData }) => {
  const { state } = useContext(GlobalStateContext);
  const { authData } = useContext(AuthContext);
  const [isStateLoaded, setIsStateLoaded] = useState(false); // check for loaded state
  const [openHelp, setOpenHelp] = useState(false); // "Help" modal
  const [residents, setResidents] = useState(state.residents);

  useEffect(() => {
    if (!state.residents) {
      const storage = getFromStorage("state");
      setIsStateLoaded(false);
      setResidents(storage.residents);
    } else {
      setIsStateLoaded(true);
      setResidents(state.residents);
    }
  }, [residents, state]);

  if (authData && !authData.isAuthenticated) {
    return null;
  }
  return (
    <>
      <div className={styles.AppHeader}>
        <h1 className={styles.AppHeader_title}>{currentResident}</h1>
        {isStateLoaded && residents.length > 0 ? (
          <SearchSection
            id="residentSearch"
            name="residentSearch"
            options={residents}
          />
        ) : null}
        <aside className={styles.AppHeader_icons}>
          <svg className={styles.icon} onClick={() => setOpenHelp(!openHelp)}>
            <use xlinkHref={`${sprite}#icon-help-with-circle`} />
          </svg>
        </aside>
      </div>
      <Modal
        isOpen={openHelp}
        handleClose={() => setOpenHelp(false)}
        modalTitle="Help"
      >
        <div className={styles.HelpModal}>
          <h1 className={styles.HelpModal_title}>Color Legend</h1>

          <div className={styles.HelpModal_legend}>
            <div
              className={styles.HelpModal_legend_entry}
              style={{ opacity: ".6" }}
            >
              <p>Red: INCOMPLETE </p>
            </div>
            <div className={styles.HelpModal_legend_entry}>
              <p style={{ color: "#61E294", opacity: ".6" }}>
                Green: COMPLETE{" "}
              </p>
            </div>
            <div className={styles.HelpModal_legend_entry}>
              <p style={{ color: "#ff957d", opacity: ".6" }}>
                Orange: PENDING/IN-PROGRESS{" "}
              </p>
            </div>
            <div className={styles.HelpModal_legend_entry}>
              <p style={{ color: "#5c75ea", opacity: ".6" }}>
                Purple: MEDICAL FOLLOW-UP{" "}
              </p>
            </div>
            <div className={styles.HelpModal_legend_entry}>
              <p
                style={{
                  color: "#333",
                  opacity: ".6",
                  backgroundColor: "#eaecef"
                }}
              >
                Grey: SCHEDULED, BUT UNTOUCHED{" "}
              </p>
            </div>
          </div>
          <hr style={{ opacity: ".4" }} />
          <div className={styles.HelpModal_Tasks}>
            <h4 className={styles.HelpModal_Tasks_title}>Status a Task</h4>
            <ul className={styles.HelpModal_Tasks_desc}>
              <ol>
                <b style={{ opacity: ".8" }}>1.</b> Click on any task. (a pop-up
                box will appear.)
              </ol>
              <ol>
                <b style={{ opacity: ".8" }}>2.</b> Fill out the fields in the
                pop-up box
              </ol>
              <ol>
                <b style={{ opacity: ".8" }}>3.</b> Click Save
              </ol>
            </ul>
          </div>
          <hr style={{ opacity: ".4" }} />
          {/* ALERT CHARTING HELP */}
          <div className={styles.HelpModal_AlertCharting}>
            <h4 className={styles.HelpModal_AlertCharting_title}>
              View Alert Charting Entries
            </h4>
            <ul className={styles.HelpModal_AlertCharting_desc}>
              <ol>
                <b style={{ opacity: ".8" }}>1.</b> Click on the{" "}
                <b>
                  <svg className={styles.bell}>
                    <use xlinkHref={`${sprite}#icon-bell`}></use>
                  </svg>{" "}
                </b>
                icon OR the down arrow{" "}
                <b>
                  (
                  <svg className={styles.bell}>
                    <use xlinkHref={`${sprite}#icon-chevron-small-down`}></use>
                  </svg>
                  ){" "}
                </b>{" "}
                just beneath the month section. This will toggle open the
                charting entries section.
              </ol>
              <ol>
                <b style={{ opacity: ".8" }}>2.</b> Fill out the fields in the
                pop-up box
              </ol>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AppHeader;
