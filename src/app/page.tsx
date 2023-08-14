import { Metadata } from "next";
import Link from "next/link";

import Cards from "@/components/cards/cards";
import GoogleMaps from "@/components/google/map";

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

async function Home() {
  return (
    <main className="md:justify-center">
      <header className="text-center my-14 max-md:px-5">
        <h2 className="font-script text-6xl mb-7">Le Petit Moabit</h2>
        <h1 className="font-karla text-2xl">
          Modern, fully furnished, all-inclusive apartments for rent in the
          heart of Berlin
        </h1>
      </header>
      <section className="flex flex-col py-5 max-md:px-5 gap-2">
        <h3>Welcome to your new home!</h3>
        <p>
          These charming one bedroom apartments are located in the heart of
          Moabit, Berlin. The apartments are fully furnished and equipped with
          everything you need to make your stay comfortable and enjoyable.
        </p>
        <p>
          The apartments features a cozy living room, a fully equipped kitchen,
          a comfortable bedroom with a double bed and a modern bathroom.
        </p>
        <p>
          The apartments are located in a quiet and peaceful neighborhood in
          Moabit, yet close to all the amenities you need. You will find plenty
          of shops, restaurants, cafes and bars within walking distance. The
          apartment is also well connected to public transportation, making it
          easy to explore the city. Book your stay today and experience the best
          of Berlin!
        </p>
      </section>
      <Cards />
      <section className="flex flex-col py-5 max-md:px-5 gap-2">
        <GoogleMaps
          center={{
            lat: 52.529,
            lng: 13.341,
          }}
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
    </main>
  );
}

export default Home;
