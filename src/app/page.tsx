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
  const apartmentsNames: TApartments = ["La Lune", "Le Soleil"];
  const bookings = await JSON.parse(
    JSON.stringify(await getData(apartmentsNames))
  );

  const apartments: IApartmentData[] = [];
  const dialog: { isOpen: boolean; startupDialogContent: string } = {
    isOpen: false,
    startupDialogContent: "",
  };
  apartmentsData.forEach((apartment: IApartmentData) => {
    apartments.push({ ...apartment, bookings: bookings[apartment.name] });
  });

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
