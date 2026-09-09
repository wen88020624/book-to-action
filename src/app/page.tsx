import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Life Experiment</h1>
      <p className={styles.subtitle}>
        Turn what you read into real experiments.
      </p>
    </main>
  );
}
