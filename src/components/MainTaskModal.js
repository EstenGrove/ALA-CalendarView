import React from "react";
import styles from "../css/MainModal.module.scss";
import { PropTypes } from "prop-types";
import TaskModal from "./TaskModal";

const MainTaskModal = ({
  isOpen,
  title,
  handleClose,
  submitHandler,
  task = {},
  tasks
}) => {
  console.log("MODAL", task);

  return (
    <div className={isOpen ? `${styles.Modal} ${styles.isOpen}` : styles.Modal}>
      <div className={styles.Modal_top}>
        <h2 className={styles.Modal_top_title}>{title}</h2>
        <h2
          className={styles.Modal_top_closeBtn}
          title="CLOSE MODAL"
          onClick={handleClose}
        >
          ×
        </h2>
      </div>

      <main className={styles.Modal_main}>
        <TaskModal
          tasks={tasks}
          task={task}
          submitHandler={submitHandler}
          handleClose={handleClose}
          isOpen={isOpen}
        />
      </main>
    </div>
  );
};
export default MainTaskModal;

MainTaskModal.defaultProps = {
  task: {}
};

MainTaskModal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  handleClose: PropTypes.func,
  submitHandler: PropTypes.func,
  task: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object)
};
