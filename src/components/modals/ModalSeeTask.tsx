import styles from "@/styles/modal-see-task.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClose } from "@fortawesome/free-solid-svg-icons";

interface Props {
  open?: boolean;
  task: Task;
  closeModal: () => void;
}

interface Task {
  id?: number;
  title: string;
  is_completed: number;
  due_date?: string;
  description?: string;
  comments?: string;
  tags?: string;
}

const ModalSeeTask: React.FC<Props> = ({ open, task, closeModal }) => {
  return (
    <div className={`${styles.modalTaskContainer} ${open ? styles.open : ""} `}>
      <div
        className={`${styles.modalTaskContainer__content} ${
          task.is_completed ? styles.complete : styles.incomplete
        }`}
      >
        <div className={styles.modalTaskContainer__header}>
          <FontAwesomeIcon icon={faCalendar} />
          <FontAwesomeIcon
            onClick={closeModal}
            icon={faClose}
            className={styles.modalTaskContainer__close}
          />
          <div>
            <p className={styles.modalTaskContainer__title}>{task.title}</p>
            <p className={styles.modalTaskContainer__date}>{task.due_date}</p>
          </div>
        </div>
        <p>{task.description}</p>
        <p className={styles.modalTaskContainer__comments}>
          <b>Comentarios: </b>
          {task.comments}
        </p>
        <p className={styles.modalTaskContainer__tags}>{task.tags}</p>
      </div>
    </div>
  );
};

export default ModalSeeTask;
