import { Metadata } from "next";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import Logo from "@/assets/logo.svg";
import Cards from "@/components/cards/cards";
import GoogleMaps from "@/components/google/map";
import type { Coordinates } from "@/utils/types";

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

type TPageDescriptionProps = {
  content: {
    header?: string;
    paragraphs?: string[];
  }[];
};

function PageDescription({ content }: TPageDescriptionProps) {
  return (
    <>
      {content.map((sec) => (
        <section
          key={uuidv4()}
          className="flex flex-col py-5 max-md:px-5 gap-2"
        >
          <h3>{sec.header}</h3>
          {sec.paragraphs?.map((par) => (
            <p key={uuidv4()}>{par}</p>
          ))}
        </section>
      ))}
    </>
  );
}

type TPageMapProps = {
  center: Coordinates;
  address: JSX.Element;
  googleMapsUrl: string;
};

function PageMap({ center, address, googleMapsUrl }: TPageMapProps) {
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
        href={googleMapsUrl}
        className="inline-flex"
      >
        <address className="inline-flex flex-wrap">{address}</address>
      </Link>
    </section>
  );
}

const PAGE_DESCRIPTION_PROPS = {
  content: [
    {
      header: "Welcome to your new home!",
      paragraphs: [
        `
      These charming one bedroom apartments are located in the heart of
      Moabit, Berlin. The apartments are fully furnished and equipped with
      everything you need to make your stay comfortable and enjoyable.
    `,
        `
      The apartments features a cozy living room, a fully equipped kitchen, a
      comfortable bedroom with a double bed and a modern bathroom.
    `,
        `
      The apartments are located in a quiet and peaceful neighborhood in
      Moabit, yet close to all the amenities you need. You will find plenty of
      shops, restaurants, cafes and bars within walking distance. The
      apartment is also well connected to public transportation, making it
      easy to explore the city. Book your stay today and experience the best
      of Berlin!
    `,
      ],
    },
    {},
  ],
} satisfies TPageDescriptionProps;

const MAP_CENTER: Coordinates = {
  lat: 52.529,
  lng: 13.341,
};

const MAP_ADDRESS: JSX.Element = (
  <>
    <span>Wilhelmshavener Straße,&nbsp;</span>
    <span>10551 Berlin, DE</span>
  </>
);

const MAP_URL = "https://goo.gl/maps/pqVN4qM8mPQG2uhs6";

const MAP_PROPS = {
  center: MAP_CENTER,
  address: MAP_ADDRESS,
  googleMapsUrl: MAP_URL,
} as TPageMapProps;

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
      <PageDescription {...PAGE_DESCRIPTION_PROPS} />
      <Cards />
      <PageMap {...MAP_PROPS} />
    </main>
  );
}

export default Home;
