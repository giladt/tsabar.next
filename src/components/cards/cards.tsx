import Card from "@/components/card/card";
import styles from "./cards.module.scss";
import apartments from "@/assets/apartments.json";

type TCardsProps = {};
export default function Cards({}: TCardsProps) {
  return (
    <section
      id="cards"
      className={styles.cards}
      aria-label="Apartments information cards"
    >
      {apartments.map(({ id, ...args }) => (
        <Card key={id} {...args} />
      ))}
    </section>
  );
}
