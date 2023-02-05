import { Field } from "formik";
import styles from "../../../styles/text-area.module.css";
const TextArea = ({
  name,
  placeholder,
  type,
  label,
  disabled,
  maxlength,
  counter,
  quitError,
  withHelper,
  textHelper,
}) => {
  return (
    <>
      <Field name={name}>
        {({ field, form: { touched, errors }, meta }) => (
          <div className={styles.textAreaContainer}>
            {label && <label>{label}</label>}
            <textarea
              type={type}
              placeholder={placeholder}
              className={meta.touched && meta.error ? styles.errorData : ""}
              disabled={disabled}
              maxLength={maxlength}
              {...field}
            />
            {counter ? (
              <div className={styles.counter}>
                {field.value.length} / {maxlength}
              </div>
            ) : (
              ""
            )}
            {meta.touched && meta.error && !quitError && (
              <div className={styles.msgError}>{meta.error}</div>
            )}{" "}
          </div>
        )}
      </Field>
    </>
  );
};

export default TextArea;
