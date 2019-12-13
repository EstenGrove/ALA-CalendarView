import React from "react";
import styles from "../css/Form.module.scss";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import StatefulButton from "./StatefulButton";

const Form = ({ handleChange, handleSubmit }) => {
  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <h4 className={styles.Form_heading}>Login</h4>
      <TextInput
        type="text"
        name="username"
        label="Username"
        required={true}
        placeholder="Type your username..."
        autocomplete="email"
        handleChange={handleChange}
      />
      <PasswordInput
        name="password"
        label="Password"
        required={true}
        placeholder="Type your password..."
        autocomplete="password"
        handleChange={handleChange}
      />
      <StatefulButton
        bgcolor="hsla(259, 77%, 64%, 0.3)"
        text="Login"
        action="Logging in..."
      />
    </form>
  );
};

export default Form;
