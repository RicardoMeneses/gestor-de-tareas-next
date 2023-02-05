import styles from "../../styles/modal-delete-task.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import api from "@/services/api";
import { useRouter } from "next/router";

interface Props {
  open?: boolean;
  closeModal: () => void;
  id: string;
}

const ModalSeeTask: React.FC<Props> = ({ open, closeModal, id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await api.delete(
      `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${id}`
    );

    router.push("/");
  };

  return (
    <div
      className={`${styles.modalDeleteTaskContainer} ${
        open ? styles.open : ""
      } `}
    >
      <div className={styles.modalDeleteTaskContainer__content}>
        <FontAwesomeIcon icon={faWarning} className={styles.icon} />
        <div className={styles.modalDeleteTaskContainer__header}>
          <h4>¿Estás seguro que quieres eliminar esta tarea?</h4>
          <p>Esta acción no se pude deshacer</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.closeModal} onClick={closeModal}>
            Cancelar
          </button>
          <button className={styles.deleteTaks} onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSeeTask;
