import type { ReactElement } from "react";
import Layout from "../layout/layout";
import type { NextPageWithLayout } from "./_app";
import CardContainer from "@/components/cards/Container";
import styles from "../styles/home.module.css";
import api from "@/services/api";
import { GetServerSideProps } from "next";

interface Task {
  id?: number;
  title: string;
  is_completed: number;
  due_date?: string;
  description?: string;
  comments?: string;
  tags?: string;
}

const Home: NextPageWithLayout = ({ tasks }: any) => {
  const completeTasks = tasks.filter((task: Task) => task.is_completed);
  const inCompleteTasks = tasks.filter((task: Task) => !task.is_completed);

  return (
    <>
      <div className={styles.container}>
        <CardContainer title="No completadas" tasks={inCompleteTasks} />
        <CardContainer title="Completadas" tasks={completeTasks} />
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const tasks = await api.get("");
    return {
      props: {
        tasks,
      },
    };
  } catch (err) {
    return {
      props: {
        tasks: [],
      },
    };
  }
};
