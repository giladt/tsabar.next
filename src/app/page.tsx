import { Metadata } from "next";
import Link from "next/link";

import Cards from "@/components/cards/cards";
import GoogleMaps from "@/components/google/map";
import type { Coordinates } from "@/utils/types";
import Logo from "@/assets/logo.svg";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      nocache: false,
    },
  },
  alternates: {
    canonical: "/",
  },
};

type TPageHeadProps = {
  headerText: string;
  subText: string;
};

function PageHead({ headerText, subText }: TPageHeadProps) {
  return (
    <>
      <h2 className="font-script text-6xl mb-7">{headerText}</h2>
      <h1 className="font-karla text-2xl">{subText}</h1>
    </>
  );
}

function PageDescription() {
  return (
    <section className="flex flex-col py-5 max-md:px-5 gap-2">
      <h3>Welcome to your new home!</h3>
      <p>
        These charming one bedroom apartments are located in the heart of
        Moabit, Berlin. The apartments are fully furnished and equipped with
        everything you need to make your stay comfortable and enjoyable.
      </p>
      <p>
        The apartments features a cozy living room, a fully equipped kitchen, a
        comfortable bedroom with a double bed and a modern bathroom.
      </p>
      <p>
        The apartments are located in a quiet and peaceful neighborhood in
        Moabit, yet close to all the amenities you need. You will find plenty of
        shops, restaurants, cafes and bars within walking distance. The
        apartment is also well connected to public transportation, making it
        easy to explore the city. Book your stay today and experience the best
        of Berlin!
      </p>
    </section>
  );
}

type TPageMapProps = {
  center: Coordinates;
};

function PageMap({ center }: TPageMapProps) {
  return (
    <section className="flex flex-col py-5 max-md:px-5 gap-2">
      <GoogleMaps
        center={center}
        zoom={14}
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
      />
      <Link
        title="Open on google maps"
        target="_blank"
        href="https://goo.gl/maps/pqVN4qM8mPQG2uhs6"
        className="inline-flex"
      >
        <address className="inline-flex flex-wrap">
          <span>Wilhelmshavener Straße,&nbsp;</span>
          <span>10551 Berlin, DE</span>
        </address>
      </Link>
    </section>
  );
}

const mapCenter: Coordinates = {
  lat: 52.529,
  lng: 13.341,
};

async function Home() {
  return (
    <main className="md:justify-center">
      <header className="text-center my-14 max-md:px-5">
        <Logo className="w-[250px] mx-auto" />
        <PageHead
          headerText="Le Petit Moabit"
          subText="Modern, fully furnished, all-inclusive apartments for rent in the heart of Berlin"
        />
      </header>
      <PageDescription />
      <Cards />
      <PageMap center={mapCenter} />
    </main>
  );
}

export default Home;
