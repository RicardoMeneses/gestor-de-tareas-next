import { Field } from "formik";
import { useState } from "react";
import styles from "../../../styles/input.module.css";
const Input = (props) => {
  const {
    name,
    placeholder,
    type,
    label,
    disabled,
    maxlength,
    error,
    quitError,
    uppercase,
    isPassword,
  } = props;
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <>
      <Field name={name}>
        {({ field, form: { touched, errors }, meta }) => (
          <div className={styles.inputContainer}>
            {label && <label>{label}</label>}
            <input
              type={isPassword ? passwordType : type}
              placeholder={placeholder}
              className={meta.touched && meta.error ? styles.errorData : ""}
              disabled={disabled}
              maxLength={maxlength}
              {...field}
            />
            {meta.touched && meta.error && !quitError && (
              <div className={styles.error}>{meta.error}</div>
            )}
          </div>
        )}
      </Field>
    </>
  );
};

export default Input;
