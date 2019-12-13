import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import styles from "../css/PriorityButton.module.scss";

const PriorityButton = ({ label, name, id, isChecked, handleClick }) => {
  useEffect(() => {}, [isChecked]);

  return (
    <div
      className={isChecked ? styles.isSelected : styles.RadioButton}
      onClick={() => handleClick(id)}
      data-name={name}
    >
      <span htmlFor={id} className={styles.RadioButton_label}>
        {label}
      </span>
    </div>
  );
};

export default PriorityButton;

PriorityButton.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  isChecked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
