import { GlobalsContext } from "@/providers/globals";
import { useContext } from "react";
import styles from "@/styles/header.module.css";
import CreateTaskForm from "@/components/forms/CreateTaskForm";

const Header = () => {
  const {
    state: { addTask },
    dispatch,
  } = useContext(GlobalsContext);
  const handleOpen = () => {
    dispatch({
      addTask: true,
    });
  };
  const handleClose = () => {
    dispatch({
      addTask: false,
    });
  };
  return (
    <header>
      <nav className={styles.nav}>
        <h2 className={styles.header__title}>Gestor de Tareas</h2>
        <button className={styles.header__button} onClick={handleOpen}>
          Nueva tarea
        </button>
      </nav>
      <CreateTaskForm open={addTask} closeTask={handleClose} />
    </header>
  );
};

export default Header;
