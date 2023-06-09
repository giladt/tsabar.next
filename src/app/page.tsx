import Cards from "@/components/cards/cards";
import Head from "next/head";
import styles from "./page.module.scss";

async function Home() {
  return (
    <>
      <Head>
        <title>Le Petit Moabit</title>
        <meta
          name="description"
          content="Furnished apartments for rent in the heart of Berlin."
        />
      </Head>
      <div className={`${styles.page} md:justify-center`}>
        <header className={styles.header}>
          <h1>Le Petit Moabit</h1>
          <h2>
            Modern, fully furnished, all-inclusive apartments for rent in the
            heart of Berlin
          </h2>
        </header>
        <Cards />
      </div>
    </>
  );
}

export default Home;
