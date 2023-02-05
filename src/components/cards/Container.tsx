import styles from "../../styles/card-container.module.css";
import Task from "./Task";
interface Props {
  title: string;
  tasks: Task[];
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

const Container: React.FC<Props> = ({ title, tasks }) => {
  return (
    <div className={styles.cardContainer}>
      <h4 className={styles.cardContainer__title}>{title}</h4>
      <div className={styles.cardContainer__tasksContainer}>
        {tasks.map((task: Task) => (
          <Task
            title={task.title}
            dueDate={task.due_date}
            isComplete={task.is_completed}
            key={task.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;
