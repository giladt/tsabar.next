import Card from "@/components/card/card";
import { store } from "@/store";

import styles from "./cards.module.scss";

type TCardsProps = {};
export default function Cards({}: TCardsProps) {
  const apartments = store.getState().apartments.startupApartments;

  return (
    <main id="main" className={styles.cards}>
      {apartments.map(({ id, name, info, images, tags }) => (
        <Card key={id} name={name} info={info} images={images} tags={tags} />
      ))}
    </main>
  );
}
