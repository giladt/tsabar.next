import Cards from "@/components/cards/cards";
import { getData } from "@/utils/data-handlers";
import { TApartments, IApartmentData } from "@/utils/types.d";

import { store } from "@/store";
import { setStartupApartments } from "@/store/apartmentSlice";
import { setStartupDialogContent } from "@/store/dialogSlice";
import apartmentsData from "@/assets/apartments.json";
import Providers from "@/components/provider/provider";
import Preloader from "@/components/preloader/preloader";
import { Dialog } from "@/components/dialog/dialog";

async function Home() {
  const apartments: IApartmentData[] = [];
  const dialog: { isOpen: boolean; startupDialogContent: string } = {
    isOpen: false,
    startupDialogContent: "",
  };

  for (let apartment of apartmentsData) {
    const url = `https://www.airbnb.com/calendar/ical/${
      process.env["ICAL_ID_APT_" + apartment.id]
    }.ics?s=${process.env["ICAL_SECRET_APT_" + apartment.id]}`;
    const bookings = JSON.parse(JSON.stringify(await getData(url)));

    apartments.push({ ...apartment, bookings });
  }

  store.dispatch(setStartupApartments(apartments));
  store.dispatch(setStartupDialogContent(dialog.startupDialogContent));

  return (
    <>
      <Preloader apartments={apartments} dialog={dialog} />
      <Providers>
        <Cards />
        <Dialog />
      </Providers>
    </>
  );
}

export default Home;
