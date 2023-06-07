import Card from "@/components/card/card";
import { store } from "@/store";

import styles from "./cards.module.scss";

type TCardsProps = {};
export default function Cards({}: TCardsProps) {
  const apartments = store.getState().apartments.startupApartments;

  return (
    <main id="main" className={styles.main}>
      <h1 className="text-3xl text-teal-800 dark:text-teal-200 font-extrabold font-sans">
        Le Petit Moabit
      </h1>
      <h2 className="text-xl">
        Modern, fully renovated, all-inclusive apartments for rent in the heart
        of Berlin
      </h2>
      <div className={styles.cards}>
        {apartments.map((apartment) => (
          <Card key={apartment.id} apartment={apartment} />
        ))}
      </div>
    </main>
  );
}
