import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faCheck,
  faClose,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/task.module.css";
import ModalSeeTask from "../modals/ModalSeeTask";
import ModalDeleteTask from "../modals/ModalDeleteTask";
import api from "@/services/api";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import EditTaskForm from "../forms/EditTaskForm";

interface Props {
  title: string;
  dueDate?: string;
  isComplete: number;
  id: string;
}

interface TaskData {
  id?: number;
  title: string;
  is_completed: number;
  due_date?: string;
  description?: string;
  comments?: string;
  tags?: string;
}

const Task: React.FC<Props> = ({ title, dueDate, isComplete, id }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [seeTask, setSeeTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickMenu, setClickMenu] = useState(false);
  const [singleTask, setSingleTask] = useState<TaskData>({
    id: 0,
    title: "",
    is_completed: 0,
  });

  const router = useRouter();

  const openSeeTask = () => {
    setSeeTask(true);
  };
  const closeSeeTask = () => {
    setSeeTask(false);
  };
  const openModalDeleteTask = () => {
    setOpenDeleteTask(true);
  };
  const closeModalDeleteTask = () => {
    setOpenDeleteTask(false);
  };
  const openEditTask = () => {
    setEditTask(true);
  };
  const closeEditTask = () => {
    setEditTask(false);
  };
  const openMenu = () => {
    setClickMenu(true);
  };

  const updateTask = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("title", singleTask.title);
    params.append("comments", singleTask.comments || "");
    params.append("description", singleTask.description || "");
    params.append("tags", singleTask.tags || "");
    params.append("is_completed", `${singleTask.is_completed ? "0" : "1"}`);
    if (singleTask.due_date) params.append("due_date", singleTask.due_date);
    await api.put(`/${singleTask.id}`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    router.push("/");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setClickMenu && setClickMenu(false);
      }
    };

    api
      .get(`/${id}`)
      .then((res: any) => {
        setSingleTask(res[0]);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [id]);

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
          onClick={openMenu}
        />
        <div
          ref={ref}
          className={`${styles.taskContainer__menuContainer} ${
            clickMenu ? styles.displayMenu : ""
          }`}
        >
          <div
            className={styles.taskContainer__menuContainer__item}
            onClick={openEditTask}
          >
            <FontAwesomeIcon icon={faEdit} />
            <p>Editar</p>
          </div>
          <div
            className={styles.taskContainer__menuContainer__item}
            onClick={openModalDeleteTask}
          >
            <FontAwesomeIcon icon={faTrash} />
            <p>Eliminar</p>
          </div>
        </div>
        <FontAwesomeIcon
          onClick={openSeeTask}
          icon={faEye}
          className={styles.taskContainer__view}
        />
        <FontAwesomeIcon
          onClick={updateTask}
          icon={isComplete ? faClose : faCheck}
          className={styles.taskContainer__action}
        />
      </div>
      <ModalSeeTask
        open={seeTask}
        task={singleTask}
        closeModal={closeSeeTask}
      />
      <ModalDeleteTask
        open={openDeleteTask}
        id={`${singleTask.id}`}
        closeModal={closeModalDeleteTask}
      />
      <EditTaskForm
        open={editTask}
        closeTask={closeEditTask}
        task={singleTask}
      />
      <div className={`${loading ? styles.loading : ""}`}></div>
    </>
  );
};

export default Task;
