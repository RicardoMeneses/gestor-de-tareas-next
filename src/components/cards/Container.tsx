import styles from "../../styles/card-container.module.css";

type Props = {
  title: string;
};

const Container: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles.cardContainer}>
      <h4 className={styles.cardContainer__title}>{title}</h4>
    </div>
  );
};

export default Container;
