import Card from "@/components/card/card";
import apartments from "@/assets/apartments.json";

type TCardsProps = {};
export default function Cards({}: TCardsProps) {
  return (
    <section
      id="cards"
      className="container flex flex-wrap gap-6 justify-around"
      aria-label="Apartments information cards"
    >
      {apartments.map(({ id, ...args }) => (
        <Card key={id} {...args} />
      ))}
    </section>
  );
}
