import { Metadata } from "next";
import { redirect } from "next/navigation";
import * as ReactMdIcon from "react-icons/md";

import { Carousel } from "@/components/image-carousel/carousel";
import { TMdIcons, IApartmentData } from "@/utils/types.d";
import apartmentsData from "@/assets/apartments.json";

import styles from "./apartment.module.scss";
import Inquiry from "@/components/forms/inquiry";
import { DateRangeType } from "react-tailwindcss-datepicker/dist/types";
import { getData, getMdFileData } from "@/utils/data-handlers";

type TApartmentURLProps = {
  apartmentURL: string;
};

type TPageParams = {
  params: TApartmentURLProps;
};

export function generateStaticParams(): TApartmentURLProps[] {
  return apartmentsData.map(
    (apartmentData): TApartmentURLProps => ({
      apartmentURL: apartmentData.url,
    })
  );
}

export function generateMetadata({ params }: TPageParams): Metadata {
  const apartmentData = apartmentsData.find(
    (apartmentData) => apartmentData.url === params.apartmentURL
  );

  return {
    title: apartmentData?.name,
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
      canonical: `/${apartmentData?.url}`,
    },
  };
}

export default async function Apartment({ params }: TPageParams) {
  const { apartmentURL } = params;

  const data = apartmentsData.find(
    (apartmentData) => apartmentData.url === encodeURI(apartmentURL || "-")
  ) as IApartmentData;

  if (!data) redirect("/");

  const { id, name, images, tags } = data;

  const iCalURL = `https://www.airbnb.com/calendar/ical/${
    process.env["ICAL_ID_APT_" + id]
  }.ics?s=${process.env["ICAL_SECRET_APT_" + id]}`;
  const bookings: DateRangeType[] = await getData(iCalURL);

  const apartmentIdStr = "00" + id.toString();
  const descriptionFileName = `we${apartmentIdStr.substring(
    apartmentIdStr.length - 2
  )}.md`;

  const description = await getMdFileData(descriptionFileName);
  debugger;

  return (
    <main className={styles.main}>
      {images && (
        <section className={styles.carousel}>
          <Carousel images={images} />
        </section>
      )}
      <header className={styles.header}>
        <h1>{name}</h1>
        <h2>
          Le Petit Moabit
          <br />
          <strong>
            Modern, fully furnished, all-inclusive apartments for rent in the
            heart of Berlin
          </strong>
        </h2>
      </header>
      <section className={styles.section}>
        {tags && (
          <div className={styles.tags}>
            {tags.map(
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
      </section>

      {description?.data && (
        <section
          className={styles.section}
          dangerouslySetInnerHTML={{ __html: description.data }}
        />
      )}

      <section
        className={`${styles.section} max-sm:px-5 flex flex-col justify-center`}
      >
        <h3>Inquiry</h3>
        <Inquiry bookings={bookings} />
      </section>
    </main>
  );
}
