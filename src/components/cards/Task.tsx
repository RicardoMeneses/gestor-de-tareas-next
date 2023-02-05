import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/task.module.css";
import ModalSeeTask from "../modals/ModalSeeTask";
import { useState } from "react";

interface Props {
  title: string;
  dueDate?: string;
  isComplete: number;
}

const Task: React.FC<Props> = ({ title, dueDate, isComplete }) => {
  const [seeTask, setSeeTask] = useState(false);

  const handleSeeTask = () => {
    setSeeTask(true);
  };

  return (
    <>
      <div
        className={`${styles.taskContainer} ${
          isComplete ? styles.complete : ""
        } `}
      >
        <p className={styles.taskContainer__title}>{title}</p>
        <p className={styles.taskContainer__date}>{dueDate}</p>
        <FontAwesomeIcon
          icon={faEllipsisV}
          className={styles.taskContainer__menu}
        />
        <FontAwesomeIcon
          onClick={handleSeeTask}
          icon={faEye}
          className={styles.taskContainer__view}
        />
        <FontAwesomeIcon
          icon={faCheck}
          className={styles.taskContainer__action}
        />
      </div>
      <ModalSeeTask open={seeTask} />
    </>
  );
};

export default Task;
