import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faCheck,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/task.module.css";
import ModalSeeTask from "../modals/ModalSeeTask";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
  const [seeTask, setSeeTask] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const updateTask = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("title", singleTask.title);
    params.append("comments", singleTask.comments || "");
    params.append("description", singleTask.description || "");
    params.append("tags", singleTask.tags || "");
    params.append("is_completed", `${singleTask.is_completed ? "0" : "1"}`);
    if (singleTask.due_date) params.append("due_date", singleTask.due_date);
    await api.put(
      `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${singleTask.id}`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    router.push("/");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    api.defaults.headers.authorization = `Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd`;
    api
      .get(`https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${id}`)
      .then((res: any) => {
        setSingleTask(res[0]);
      })
      .catch((err) => {
        console.log(err, "error");
      });
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
        />
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
      <div className={`${loading ? styles.loading : ""}`}></div>
    </>
  );
};

export default Task;
