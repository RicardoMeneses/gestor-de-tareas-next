import { Formik } from "formik";
import * as Yup from "yup";
import styles from "@/styles/create-task-form.module.css";
import api from "@/services/api";
import Input from "@/components/utils/forms/Input";
import TextArea from "@/components/utils/forms/TextArea";
import BooleanRadio from "@/components/utils/forms/BooleanRadio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

interface Props {
  open?: boolean;
  closeTask: () => void;
  task: Task;
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

const EditTaskForm: React.FC<Props> = ({ open, closeTask, task }) => {
  const router = useRouter();
  const initialValues = {
    title: task.title,
    is_completed: `${task.is_completed}`,
    due_date: task.due_date || "",
    description: task.description || "",
    comments: task.comments || "",
    tags: task.tags || "",
  };
  const editTask = async (params: any) => {
    await fetch(
      `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${task.id}?token=ricard_mm`,
      {
        body: params,
        headers: {
          Authorization:
            "Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "PUT",
      }
    );
    // api.post("/?token=ricardo_mm", params, {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // });
  };
  return (
    <div
      className={`${styles.modalAddTaskContainer} ${open ? styles.open : ""}`}
    >
      <div className={styles.modalAddTaskContainer__content}>
        <div className={styles.modalAddTaskContainer__header}>
          <p>Editar tarea {task.title}</p>
          <FontAwesomeIcon
            icon={faClose}
            className={styles.icon}
            onClick={closeTask}
          />
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string().required("Este campo es obligatorio"),
            due_date: Yup.string(),
            description: Yup.string(),
            comments: Yup.string(),
            tags: Yup.string(),
            is_completed: Yup.string(),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const params = new URLSearchParams();

            params.append("title", values.title);
            params.append("description", values.description || "");
            params.append("comments", values.comments || "");
            if (values.due_date) params.append("due_date", values.due_date);
            params.append("is_completed", `${values.is_completed}`);
            params.append("tags", values.tags || "");
            params.append("token", "ricardo_mm");

            editTask(params);
            resetForm();
            closeTask();

            router.push("/");
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div className={styles.modalAddTaskContainer__formContainer}>
                <div className={styles.modalAddTaskContainer__form__grid}>
                  <Input name="title" label="Título*" />
                  <Input name="due_date" label="Fecha" type="date" />
                </div>
                <TextArea
                  name="description"
                  label="Descripción"
                  placeholder="Descripción de la terea"
                  maxlength="150"
                  counter={true}
                  type={undefined}
                  disabled={undefined}
                  quitError={undefined}
                  withHelper={undefined}
                  textHelper={undefined}
                />
                <TextArea
                  name="comments"
                  label="Comentarios"
                  placeholder="Comentarios de la terea"
                  maxlength="150"
                  counter={true}
                  type={undefined}
                  disabled={undefined}
                  quitError={undefined}
                  withHelper={undefined}
                  textHelper={undefined}
                />

                <Input name="tags" label="Etiquetas" />
                <BooleanRadio label="¿Está completada?" name="is_completed" />
                <div className={styles.modalAddTaskContainer__form__actions}>
                  <button className={styles.btnCancel} onClick={closeTask}>
                    Cancelar
                  </button>
                  <button type="submit" className={styles.btnAdd}>
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditTaskForm;
