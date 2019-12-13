import React, { useEffect, useState, useContext } from "react";
import styles from "../css/HomePage.module.scss";
import LoginForm from "./LoginForm";
import ErrorMessage from "./ErrorMessage";
import { AuthContext } from "../state/AuthContext";
import { login } from "../auth/utils";

const HomePage = props => {
  const { authData, setAuthData } = useContext(AuthContext);
  const [pageState, setPageState] = useState({
    isSubmitting: false,
    wasSuccessful: null
  });
  const [inputs, setInputs] = useState();

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setPageState({
      ...pageState,
      isSubmitting: true
    });
    const { username, password } = inputs;
    const data = await login(username, password, "AdvantageTracker");

    if (data.Data) {
      setPageState({
        ...pageState,
        isSubmitting: false,
        wasSuccessful: true
      });
      setAuthData({
        username: username,
        password: password,
        token: data.Data,
        isAuthenticated: true
      });

      return props.history.replace("/weekly");
    }
    return setPageState({
      showError: true,
      isSubmitting: false,
      wasSuccessful: false
    });
  };

  // useEffect(() => {}, [pageState.wasSuccessful]);

  return (
    <div className={styles.HomePage}>
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
      {pageState.showError && (
        <ErrorMessage
          heading="There was an Error!"
          text="Invalid Credentials. Please try again."
        />
      )}
    </div>
  );
};

export default HomePage;
