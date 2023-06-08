import Card from "@/components/card/card";
import { store } from "@/store";

import styles from "./cards.module.scss";

type TCardsProps = {};
export default function Cards({}: TCardsProps) {
  const apartments = store.getState().apartments.startupApartments;

  return (
    <main id="main" className={styles.cards}>
      {apartments.map((apartment) => (
        <Card key={apartment.id} apartment={apartment} />
      ))}
    </main>
  );
}
