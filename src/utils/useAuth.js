import { useState } from "react";
import { test } from "../auth/auth_env";
import { auth } from "../auth/auth_endpoints";

export const useAuth = () => {
  const [authError, setAuthError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeUser, setActiveUser] = useState({
    token: null,
    username: null,
    password: null,
    sessionID: null
  });

  async function login(username, password, appID, callback = null) {
    let url = test.url + auth.login;
    url += "?loginId=" + username;
    url += "&loginPwd=" + password;
    url += "&loginApp=" + appID;

    console.log(url);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Basic " + btoa(test.user + ":" + test.password)
        })
      });
      const json = await res.json();
      const { Data } = await json;

      setActiveUser({
        token: Data,
        username: username,
        password: password,
        sessionID: window.localStorage.setItem(
          username,
          Math.random()
            .toString(36)
            .substr(2, 5) + btoa(test.user + ":" + test.password)
        )
      });
      setIsAuthenticated(true);
      console.log(json);
      if (!callback) return;
      callback();
      return json;
    } catch (err) {
      return setAuthError(err);
    }
  }

  async function logout(username, password, token, appID) {
    let url = test.base + auth.logout;
    url += "?loginId=" + username;
    url += "&loginPwd=" + password;
    url += "&loginApp=" + appID;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: new Headers({
          Authorization: "Basic " + btoa(test.user + ":" + test.password),
          SecurityToken: token,
          "Content-Type": "application/json; charset=utf-8"
        })
      });
      const json = await res.json();
      window.localStorage.removeItem(username);
      setActiveUser({
        sessionID: null,
        username: null,
        password: null,
        token: null
      });

      console.group("useAuth: logout");
      console.log(json);
      console.groupEnd();
      return setIsAuthenticated(false);
    } catch (err) {
      setIsAuthenticated(false);
      return setAuthError(err);
    }
  }

  async function checkLoginStatus(username, password, token = null, appID) {
    let url = test.base + auth.loginStatus;
    url += "?loginId=" + username;
    url += "&loginPwd=" + password;
    url += "&loginApp=" + appID;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: new Headers({
          Authorization: "Basic " + token,
          "Content-Type": "application/json; charset=utf-8"
        })
      });
      const json = await res.json();
      json.Data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      return setAuthError(err);
    }
  }

  function checkUserSession(username) {
    if (!username) {
      return alert(
        "%cYou are not logged in!",
        "color: #5c75ea;font-size: 32px;"
      );
    }
    return window.localStorage.getItem(username)
      ? alert("%cYou are logged in", "color: #5c75ea;font-size: 32px;")
      : alert("%cYou are not logged in!", "color: #5c75ea;font-size: 32px;");
  }

  return {
    login,
    logout,
    checkLoginStatus,
    authError,
    setAuthError,
    isAuthenticated,
    setIsAuthenticated,
    activeUser,
    setActiveUser,
    checkUserSession
  };
};
