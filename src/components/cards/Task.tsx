import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/task.module.css";

interface Props {
  title: string;
  due_date?: string;
}

const Task: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles.taskContainer}>
      <p className={styles.taskContainer__title}>{title}</p>
      <p className={styles.taskContainer__date}>12-04-2202</p>
      <FontAwesomeIcon
        icon={faEllipsisV}
        className={styles.taskContainer__menu}
      />
      <FontAwesomeIcon icon={faEye} className={styles.taskContainer__view} />
      <FontAwesomeIcon
        icon={faCheck}
        className={styles.taskContainer__action}
      />
    </div>
  );
};

export default Task;
