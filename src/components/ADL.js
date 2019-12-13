import React from "react";
import styles from "../css/ADL.module.scss";
import { PropTypes } from "prop-types";
import { checkCategoryNaming, keyGenerator } from "../helpers/misc_helpers";

const ADL = ({ categories }) => {
  return (
    <div className={styles.ADL_Heading}>
      {categories &&
        categories.map((category, index) => (
          <div
            className={styles.ADL}
            key={`${category.AdlCategory}_${index}_${keyGenerator()}`}
          >
            <h4
              className={styles.ADL_title}
              key={`${category.AdlCategory}_${index}`}
            >
              {checkCategoryNaming(category.AdlCategory)}
            </h4>
          </div>
        ))}
    </div>
  );
};

export default ADL;

ADL.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired
};
