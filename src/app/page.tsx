import Cards from "@/components/cards/cards";
import { getData } from "@/utils/data-handlers";
import { IApartmentData } from "@/utils/types.d";

import { store } from "@/store";
import { setStartupApartments } from "@/store/apartmentSlice";
import apartmentsData from "@/assets/apartments.json";
import Providers from "@/components/provider/provider";
import Preloader from "@/components/preloader/preloader";

async function Home() {
  const apartments: IApartmentData[] = [];

  for (let apartment of apartmentsData) {
    const url = `https://www.airbnb.com/calendar/ical/${
      process.env["ICAL_ID_APT_" + apartment.id]
    }.ics?s=${process.env["ICAL_SECRET_APT_" + apartment.id]}`;
    const bookings = JSON.parse(JSON.stringify(await getData(url)));

    apartments.push({ ...apartment, bookings });
  }

  store.dispatch(setStartupApartments(apartments));

  return (
    <>
      <Preloader apartments={apartments} />
      <Providers>
        <Cards />
      </Providers>
    </>
  );
}

export default Home;
