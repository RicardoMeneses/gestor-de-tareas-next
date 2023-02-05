import styles from "../../../styles/radio.module.css";
import { Field } from "formik";

const RadioStrip = (props) => {
  const { name, label } = props;
  return (
    <div className={styles.radioContainer}>
      <div className={styles.label}>{label}</div>
      <div className={styles.radioOptionsContainer}>
        <div className={styles.radioOption}>
          <Field type="radio" name={name} value="0" id={name + "no"} />
          <label htmlFor={name + "no"}>No</label>
        </div>
        <div className={styles.radioOption}>
          <Field type="radio" name={name} value="1" id={name + "yes"} />
          <label htmlFor={name + "yes"}>Si</label>
        </div>
      </div>
    </div>
  );
};

export default RadioStrip;
