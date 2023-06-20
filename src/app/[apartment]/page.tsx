import { Metadata, ResolvingMetadata } from "next";
import { Dancing_Script, Karla } from "next/font/google";
import { redirect } from "next/navigation";
import * as ReactMdIcon from "react-icons/md";

import { Carousel } from "@/components/image-carousel/carousel";
import { Calendar } from "@/components/calendar/calendar";
import { TBookings, TMdIcons, IApartmentData } from "@/utils/types.d";
import { getData } from "@/utils/data-handlers";
import { wfImageUrl } from "@/utils/images";
import apartments from "@/assets/apartments.json";

import styles from "./apartment.module.scss";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  preload: true,
});

type Props = {
  params: {
    apartment: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const url = params.apartment;

  const apartment = apartments.find((apartment) => apartment.url === url);
  const defaultImage = "";
  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: apartment?.name || "Le Petit Moabit",
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        nocache: true,
      },
    },
    alternates: {
      canonical: "/imprint",
    },
    openGraph: {
      images: [
        `${
          apartment?.images[0]
            ? wfImageUrl(apartment.images[0].id, "th")
            : defaultImage
        }`,
        ...previousImages,
      ],
    },
  };
}

export function generateStaticParams(): Props[] {
  const urls: Props[] = apartments.map(({ url }) => {
    return {
      params: {
        apartment: url,
      },
    };
  });

  return urls;
}

export default async function Apartment({
  params,
}: {
  params: { apartment: string };
}) {
  const { apartment } = params;

  const data = apartments.find(
    (apt) => apt.url === encodeURI(apartment)
  ) as IApartmentData;
  // const { id, url, name, images, tags, bookings } = data;

  const url = `https://www.airbnb.com/calendar/ical/${
    process.env["ICAL_ID_APT_" + data.id]
  }.ics?s=${process.env["ICAL_SECRET_APT_" + data.id]}`;
  const bookingsData = await getData(url);
  const bookings = await JSON.parse(JSON.stringify(bookingsData));

  data.bookings = { ...bookings };

  if (!data) redirect("/");

  return (
    <main className={`md:justify-center ${karla.className}`}>
      {data?.images && (
        <section className={styles.carousel}>
          <Carousel images={data.images} />
        </section>
      )}
      <header className={styles.header}>
        <h1 className={dancing.className}>{data?.name}</h1>
        <h2>Le Petit Moabit</h2>
        <h3>
          Modern, fully furnished, all-inclusive apartments for rent in the
          heart of Berlin
        </h3>
      </header>
      <section className={styles.section}>
        {data.tags && (
          <div className={styles.tags}>
            {data.tags.map(
              ({ icon, text }: { icon: TMdIcons; text: string }, index) => {
                const MdIcon = ReactMdIcon[icon];
                return (
                  <span key={`tag-${index}`} className={styles.tag}>
                    <MdIcon className={styles.tag__icon} />
                    <div className={styles.tag__text}>{text}</div>
                  </span>
                );
              }
            )}
          </div>
        )}
        <p>
          <strong>Welcome to your new home!</strong>
          <br />
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
      <section>
        <h3>{data.name} Availability</h3>
        <Calendar bookings={data.bookings} />
      </section>
    </main>
  );
}
