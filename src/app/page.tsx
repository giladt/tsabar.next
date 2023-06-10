import Cards from "@/components/cards/cards";
import Head from "next/head";
import styles from "./page.module.scss";

async function Home() {
  return (
    <main className={`${styles.page} md:justify-center`}>
      <Head>
        <title>
          Le Petit Moabit - Furnished apartments for rent in the heart of Berlin
          - Moabit
        </title>
        <meta
          name="description"
          content="Need a place to stay in Berlin? Search no more! Furnished, fully-equipped, all-inclusive one-room apartments for rent in the heart of Berlin - Moabit."
        />
      </Head>
      <header className={styles.header}>
        <h2>Le Petit Moabit</h2>
        <h1>
          Modern, fully furnished, all-inclusive apartments for rent in the
          heart of Berlin
        </h1>
      </header>
      <section className={styles.section}>
        <p>
          <strong>Welcome to your new home!</strong>
          <br />
          These charming one bedroom apartments are located in the heart of
          Moabit, Berlin. The apartments are fully furnished and equipped with
          everything you need to make your stay comfortable and enjoyable.
        </p>
        <p>
          The apartments features a cozy living room, a fully equipped kitchen,
          a comfortable bedroom with a double bed and a modern bathroom.
        </p>
        <p>
          The apartments are located in a quiet and peaceful neighborhood in
          Moabit, yet close to all the amenities you need. You will find plenty
          of shops, restaurants, cafes and bars within walking distance. The
          apartment is also well connected to public transportation, making it
          easy to explore the city. Book your stay today and experience the best
          of Berlin!
        </p>
      </section>
      <Cards />
      <footer className={styles.footer}>
        <span>
          <small>Made with 💓 in Berlin</small>
        </span>
        <span>
          <small>© TSABAR.net 2023</small>
        </span>
      </footer>
    </main>
  );
}

export default Home;
