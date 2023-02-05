import styles from "../../styles/modal-see-task.module.css";

interface Props {
  open?: boolean;
}

const ModalSeeTask: React.FC<Props> = ({ open }) => {
  return (
    <div className={`${styles.modalTaskContainer} ${open ? styles.open : ""}`}>
      <div className={styles.modalTaskContainer__content}>
        <h4>Filtros</h4>
      </div>
    </div>
  );
};

export default ModalSeeTask;
