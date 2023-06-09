import Card from "@/components/card/card";
import styles from "./cards.module.scss";
import apartmentsData from "@/assets/apartments.json";
import { getData } from "@/utils/data-handlers";
import { IApartmentData } from "@/utils/types.d";

type TCardsProps = {};
export default async function Cards({}: TCardsProps) {
  const apartments: IApartmentData[] = [];

  for (let apartment of apartmentsData) {
    const url = `https://www.airbnb.com/calendar/ical/${
      process.env["ICAL_ID_APT_" + apartment.id]
    }.ics?s=${process.env["ICAL_SECRET_APT_" + apartment.id]}`;
    const bookings = JSON.parse(JSON.stringify(await getData(url)));

    apartments.push({ ...apartment, bookings });
  }

  return (
    <main id="main" className={styles.cards}>
      {apartments.map(({ id, ...args }) => (
        <Card key={id} {...args} />
      ))}
    </main>
  );
}
