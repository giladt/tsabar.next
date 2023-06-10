import Card from "@/components/card/card";
import styles from "./cards.module.scss";
import apartmentsData from "@/assets/apartments.json";
import { getData } from "@/utils/data-handlers";
import { IApartmentData } from "@/utils/types.d";

type TCardsProps = {};
export default async function Cards({}: TCardsProps) {
  const apartments: IApartmentData[] = [];

  for (let apartment of apartmentsData as IApartmentData[]) {
    const url = `https://www.airbnb.com/calendar/ical/${
      process.env["ICAL_ID_APT_" + apartment.id]
    }.ics?s=${process.env["ICAL_SECRET_APT_" + apartment.id]}`;
    const data = await getData(url);
    const bookings = await JSON.parse(JSON.stringify(data));

    apartments.push({ ...apartment, bookings });
  }

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
