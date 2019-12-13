import React from "react";
import styles from "../css/PageNotFound.module.scss";
import { history } from "../App";

const PageNotFound = props => {
  const changeRoute = route => history.replace(route);

  return (
    <div className={styles.PageNotFound}>
      <h1 className={styles.PageNotFound_title}>Sorry :(</h1>
      <h2 className={styles.PageNotFound_subtitle}>Page was not found!</h2>
      <section className={styles.PageNotFound_redirects}>
        <button
          className={styles.PageNotFound_redirects_redirectBtn}
          onClick={() => history.goBack()}
        >
          Go Back
        </button>
        <button
          className={styles.PageNotFound_redirects_redirectBtn}
          onClick={() => changeRoute("/")}
        >
          Go Home
        </button>
      </section>
    </div>
  );
};

export default PageNotFound;
