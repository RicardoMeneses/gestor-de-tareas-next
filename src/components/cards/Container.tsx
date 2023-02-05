import styles from "../../styles/card-container.module.css";
import Task from "./Task";
interface Props {
  title: string;
}

const Container: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles.cardContainer}>
      <h4 className={styles.cardContainer__title}>{title}</h4>
      <div className={styles.cardContainer__tasksContainer}>
        <Task title="Nueva" />
        <Task title="Nueva" />
        <Task title="Nueva" />
        <Task title="Nueva" />
        <Task title="Nueva" />
        <Task title="Nueva" />
        <Task title="Nueva" />
        <Task title="Nueva" />
        <Task title="Nueva" />
        <Task title="Nueva" />
      </div>
    </div>
  );
};

export default Container;
