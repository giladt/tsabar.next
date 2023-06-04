import Cards from "@/components/cards/cards";
import { getData } from "@/utils/data-handlers";
import { TApartments } from "@/utils/types.d";

async function Home() {
  const apartments: TApartments = ["La Lune", "Le Soleil"];
  const bookings = await JSON.parse(JSON.stringify(await getData(apartments)));

  return (
    <>
      <Cards bookings={bookings} />;{JSON.stringify(bookings)}
    </>
  );
}

export default Home;
