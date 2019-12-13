import React from "react";
import { PropTypes } from "prop-types";
import styles from "../css/StyledCheckbox.module.scss";

const StyledCheckbox = ({
  label,
  name,
  id,
  val,
  handleBlur,
  handleCheckbox,
  customStyles = {}
}) => {
  return (
    <div className={styles.StyledCheckbox} style={customStyles}>
      <input
        value={val}
        type="checkbox"
        name={name}
        id={id}
        // checked={val}
        className={styles.StyledCheckbox_checkbox}
        onChange={handleCheckbox}
        onBlur={handleBlur}
      />
      <label htmlFor={id} className={styles.StyledCheckbox_label}>
        {label}
      </label>
    </div>
  );
};
export default StyledCheckbox;

// #PropTypes
StyledCheckbox.defaultProps = {
  customStyles: {}
};

StyledCheckbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  val: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func,
  handleCheckbox: PropTypes.func.isRequired,
  customStyles: PropTypes.object
};
