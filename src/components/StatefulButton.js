// updated as of 11/3/19
import React, { useRef, useState, useEffect } from "react";
import styles from "../css/StatefulButton.module.scss";

const StatefulButton = ({
  action,
  text,
  callback,
  override,
  customStyles = {}
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const btnRef = useRef();

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => {
        setIsDisabled(false);
        setIsLoading(false);
        btnRef.current.removeAttribute("disabled", false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleClick = e => {
    e.preventDefault();
    if (!callback) {
      btnRef.current.setAttribute("disabled", true);
      return setIsLoading(true);
    }
    btnRef.current.setAttribute("disabled", true);
    setIsLoading(true);
    return callback(e); // optional callback
  };

  return (
    <button
      ref={btnRef}
      onClick={e => handleClick(e)}
      className={isLoading ? styles.Button_disabled : styles.Button}
      disabled={isDisabled}
      style={customStyles}
    >
      {isLoading ? action : text}
    </button>
  );
};
export default StatefulButton;
