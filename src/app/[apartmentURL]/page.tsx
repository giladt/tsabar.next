import { Metadata } from "next";
import { redirect } from "next/navigation";
import * as ReactMdIcon from "react-icons/md";

import { Carousel } from "@/components/image-carousel/carousel";
import { TMdIcons, IApartmentData } from "@/utils/types.d";
import apartmentsData from "@/assets/apartments.json";

import styles from "./apartment.module.scss";
import Inquiry from "@/components/forms/inquiry";
import { DateRangeType } from "react-tailwindcss-datepicker/dist/types";
import { getData } from "@/utils/data-handlers";

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

      <section className={styles.section}>
        <h3>Welcome to your new home!</h3>
        <h4>
          The <strong>entire apartment</strong> only for your self!
        </h4>
        <p>
          Welcome to your perfect home in the heart of Berlin! This fully
          furnished, all-inclusive one-bedroom apartment in the vibrant
          neighborhood of Moabit offers everything you need for a comfortable
          and convenient living experience.
        </p>
        <h4>Apartment Features</h4>
        <ul>
          <li>Spacious and stylish one-bedroom apartment</li>
          <li>Thoughtfully designed interiors with modern furnishings</li>
          <li>Open-concept living and sleeping area for maximum comfort</li>
          <li>Fully equipped kitchen</li>
          <li>Cozy bedroom with a comfortable double-bed</li>
          <li>Ample storage space throughout the apartment</li>
          <li>High-speed internet</li>
          <li>Convenient in-unit washer for your laundry needs</li>
          <li>Central heating</li>
        </ul>
        <h4>All-Inclusive Amenities</h4>
        <p>
          We believe in hassle-free living, which is why all utilities
          (including water, electricity, internet, and maintenance) are included
          in the monthly rent
        </p>
        <h4>Address Registration (&apos;Anmeldung&apos;)</h4>
        <p>
          In order to ease your process of setting your base in the city, we can
          provide you with the landlord approval form for your address
          registration. This way you can move on with the german bureaucracy
          more smoothly
        </p>
        <h4>Pricing and Availability:</h4>
        <p>
          The fully furnished, all-inclusive one-bedroom apartment in Moabit
          might be available for immediate move-in. Rent for this apartment
          starts at €1,500 per month, which includes all utilities and
          amenities. Don&apos;t miss this opportunity to live in the heart of
          Berlin with all the comfort and convenience you deserve.
        </p>
        <p>
          Check the availability, and contact us for more information or reserve
          your stay in your new home today!
        </p>
      </section>

      <section
        className={`${styles.section} max-sm:px-5 flex flex-col justify-center`}
      >
        <h3>Inquiry</h3>
        <Inquiry bookings={bookings} />
      </section>
    </main>
  );
}
