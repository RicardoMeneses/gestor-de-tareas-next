import styles from "../styles/header.module.css";

const Header = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <h2 className={styles.header__title}>Gestor de Tareas</h2>
        <button className={styles.header__button}>Nueva tarea</button>
      </nav>
    </header>
  );
};

export default Header;
