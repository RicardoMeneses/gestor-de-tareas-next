import type { ReactElement } from "react";
import Layout from "../layout/layout";
import type { NextPageWithLayout } from "./_app";
import CardContainer from "../components/cards/Container";
import styles from "../styles/home.module.css";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className={styles.container}>
        <CardContainer title="No completadas" />
        <CardContainer title="Completadas" />
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
