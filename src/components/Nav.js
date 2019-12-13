import React, { useContext, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { AuthContext } from "../state/AuthContext";
import { GlobalStateContext } from "../state/GlobalStateContext";
import { logout } from "../auth/utils";
import { clearStorage } from "../helpers/storage_helpers";
import logo from "../assets/LOGO-ONLY-TITLE.png";
import styles from "../css/Nav.module.scss";
import all from "../assets/all.svg";
import LogoutButton from "./LogoutButton";

const Nav = ({ history }) => {
  const { authData, setAuthData } = useContext(AuthContext);
  const { dispatch } = useContext(GlobalStateContext);
  const [navOpen, setNavOpen] = useState(false);

  const handleLogout = async e => {
    e.preventDefault();
    const response = await logout(authData.token);
    dispatch({ type: "LOGOUT_STATE" });

    if (response.Data) {
      setAuthData({
        username: null,
        password: null,
        token: null,
        sessionID: null,
        isAuthenticated: false
      });
      clearStorage();
      return history.replace("/");
    }
    dispatch({ type: "LOGOUT_STATE" });
    return history.replace("/");
  };

  return (
    <>
      <nav className={styles.Nav}>
        <ul className={styles.Nav_list}>
          <div className={styles.Nav_list_logoContainer}>
            <NavLink to="/">
              <img
                src={logo}
                alt="AL Advantage Mobile Logo - only title"
                className={styles.Nav_list_logoContainer_logo}
              />
            </NavLink>
          </div>
          <li className={styles.Nav_list_link} style={{ marginLeft: "auto" }}>
            <NavLink to="/vitals">Vitals</NavLink>
          </li>
          <li className={styles.Nav_list_link}>
            <NavLink to="/daily">Daily</NavLink>
          </li>
          <li className={styles.Nav_list_link}>
            <NavLink to="/weekly">Weekly</NavLink>
          </li>
          <li className={styles.Nav_list_link}>
            <NavLink to="/monthly">Monthly</NavLink>
          </li>
          <li className={styles.Nav_list_link}>
            <NavLink to="/summary">Summary</NavLink>
          </li>
          <li className={styles.Nav_list_mobile}>
            <svg
              className={styles.Nav_list_mobile_icon}
              onClick={() => setNavOpen(!navOpen)}
            >
              <use xlinkHref={`${all}#icon-menu`} />
            </svg>
          </li>
          {authData.isAuthenticated && (
            <li className={styles.Nav_list_customlink}>
              <LogoutButton
                text="Logout"
                action="Logging out..."
                callback={handleLogout}
              />
            </li>
          )}
        </ul>
      </nav>

      {/* mobile menu */}
      <div
        className={navOpen ? `${styles.Mobile} ${styles.show}` : styles.Mobile}
      >
        <ul className={styles.Mobile_list}>
          <li className={styles.Mobile_list_link}>
            <NavLink to="/vitals">Vitals</NavLink>
          </li>
          <li className={styles.Mobile_list_link}>
            <NavLink to="/daily">Daily</NavLink>
          </li>
          <li className={styles.Mobile_list_link}>
            <NavLink to="/weekly">Weekly</NavLink>
          </li>
          <li className={styles.Mobile_list_link}>
            <NavLink to="/monthly">Monthly</NavLink>
          </li>
          <li className={styles.Mobile_list_link}>
            <NavLink to="/summary">Summary</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default withRouter(Nav);
