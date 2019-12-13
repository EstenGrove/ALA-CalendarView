import { useState } from "react";

const initialState = {
  values: {},
  touched: {},
  isSubmitting: false
};

export const useForm = ({ ...vals }) => {
  const [formState, setFormState] = useState({
    values: {
      ...vals
    },
    touched: {},
    isSubmitting: false
  });

  const handleBlur = e => {
    e.persist();
    const { name } = e.target;
    const { touched } = formState;
    return setFormState({
      ...formState,
      touched: { ...touched, [name]: true }
    });
  };

  const handleFocus = inputRef => {
    console.log(inputRef);
    return inputRef.current.focus();
  };

  const handleReset = e => {
    e.preventDefault();
    e.persist();
    return setFormState(initialState);
  };

  const handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    const { values } = formState;
    return setFormState({
      ...formState,
      values: {
        ...values,
        [name]: value
      }
    });
  };

  const handleCheckbox = e => {
    e.persist();
    const { name, checked } = e.target;
    const { values } = formState;
    setFormState({
      ...formState,
      values: {
        ...values,
        [name]: checked
      }
    });
  };

  const handleSubmit = (e, callback = null) => {
    e.preventDefault();
    e.persist();
    setFormState({
      ...formState,
      isSubmitting: true
    });
    if (!callback) return;
    return callback();
  };

  return {
    formState,
    setFormState,
    handleBlur,
    handleFocus,
    handleReset,
    handleCheckbox,
    handleChange,
    handleSubmit
  };
};
