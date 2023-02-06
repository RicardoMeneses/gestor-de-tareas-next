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
}

const CreateTaskForm: React.FC<Props> = ({ open, closeTask }) => {
  const router = useRouter();
  const createTaks = (params: any) => {
    api.post("/?token=ricardo_mm", params);
  };
  return (
    <div
      className={`${styles.modalAddTaskContainer} ${open ? styles.open : ""}`}
    >
      <div className={styles.modalAddTaskContainer__content}>
        <div className={styles.modalAddTaskContainer__header}>
          <p>Agregar tarea</p>
          <FontAwesomeIcon
            icon={faClose}
            className={styles.icon}
            onClick={closeTask}
          />
        </div>
        <Formik
          initialValues={{
            title: "",
            due_date: "",
            description: "",
            comments: "",
            tags: "",
            is_completed: "0",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Este campo es obligatorio"),
            due_date: Yup.string(),
            description: Yup.string(),
            comments: Yup.string(),
            tags: Yup.string(),
            is_completed: Yup.string(),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const params = new URLSearchParams();

            params.append("title", values.title);
            params.append("description", values.description || "");
            params.append("comments", values.comments || "");
            if (values.due_date) params.append("due_date", values.due_date);
            params.append("is_completed", `${values.is_completed}`);
            params.append("tags", values.tags || "");
            params.append("token", "ricardo_mm");

            createTaks(params);

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
                    Crear
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

export default CreateTaskForm;
