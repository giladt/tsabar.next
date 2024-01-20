import { Metadata } from "next";
import { redirect } from "next/navigation";
import * as ReactMdIcon from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import { Carousel } from "@/components/image-carousel/carousel";
import { TMdIcons } from "@/utils/types.d";
import apartmentsData from "@/assets/apartments.json";

import Inquiry from "@/components/forms/inquiry";
import { getData, getMdFileData } from "@/utils/data-handlers";
import { RangeKeyDict } from "react-date-range";
import {
  CarouselImage,
  TCarouselImage,
} from "@/components/image-carousel/carousel-image";

type TApartmentURLProps = {
  apartmentURL: string;
};

type TPageParams = {
  params: TApartmentURLProps;
};

type TApartmentData = (typeof apartmentsData)[0];

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

  if (!apartmentData) return {};

  return {
    title: apartmentData.heading.name,
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
      canonical: `/${apartmentData.url}`,
    },
  };
}

export default async function Apartment({ params }: TPageParams) {
  const { apartmentURL } = params;

  const data = apartmentsData.find(
    (apartmentData) => apartmentData.url === encodeURI(apartmentURL || "-")
  );

  if (!data) redirect("/");

  const { id, heading, images, tags } = data;

  const bookings = await getApartmentBookingFromICal(id);

  const description = await getApartmentDescriptionFromFile(id);

  return (
    <main className="md:justify-center">
      {images && (
        <section className="overflow-hidden -mx-[calc(50svw-50%)] md:w-[calc(100svw-9px)]">
          <Carousel
            wrapperTWStyles="h-[80svh] md:h-[90svh] relative bg-black/50 shadow-xl shadow-black dark:shadow-white"
            ariaLabel="Apartment photos"
          >
            {images.map((image: TCarouselImage, index: number) => (
              <CarouselImage
                key={uuidv4()}
                image={image}
                styles="object-contain object-center"
                size={{ w: 1980, h: 1080, type: "lg" }}
                index={index}
              />
            ))}
          </Carousel>
        </section>
      )}

      {heading && (
        <header className="text-center mt-3 mb-14 max-md:px-5">
          <h1>{heading.name}</h1>
          <h2>
            {heading.title}
            <br />
            <strong>{heading.description}</strong>
          </h2>
        </header>
      )}

      {tags?.length && (
        <section className="flex flex-col py-5 max-md:px-5 gap-2">
          <div className="flex justify-center gap-2 flex-wrap">
            {tags.map(({ icon, text }, index) => {
              const MdIcon = ReactMdIcon[icon as TMdIcons];
              return (
                <span
                  key={`tag-${index}`}
                  className="inline-flex items-center gap-1 rounded-full 
                      px-2 py-1 cursor-default font-semibold 
                      bg-white/25 hover:bg-white/50
                      transition-colors"
                >
                  {MdIcon && <MdIcon className="h-5 w-5" />}
                  <div>{text}</div>
                </span>
              );
            })}
          </div>
        </section>
      )}

      {bookings && (
        <section className="flex flex-col py-5 max-md:px-5 gap-2 max-sm:px-5 justify-center">
          <h3>Availability</h3>
          <Inquiry apartment={{ id, name: heading.name }} bookings={bookings} />
        </section>
      )}

      {description?.data && (
        <section
          className="flex flex-col py-5 max-md:px-5 gap-2"
          dangerouslySetInnerHTML={{ __html: description.data }}
        />
      )}
    </main>
  );
}

async function getApartmentBookingFromICal(
  id: number
): Promise<RangeKeyDict["bookings"][]> {
  const iCalURL = `https://www.airbnb.com/calendar/ical/${
    process.env["ICAL_ID_APT_" + id]
  }.ics?s=${process.env["ICAL_SECRET_APT_" + id]}`;

  const bookings = await getData(iCalURL);
  if (!bookings[0]?.startDate || isNaN(+bookings[0].startDate)) {
    return [];
  }
  return bookings;
}

async function getApartmentDescriptionFromFile(
  id: number
): Promise<{ data: string } | null> {
  const apartmentIdStr = "00" + id.toString();
  const descriptionFileName = `we${apartmentIdStr.substring(
    apartmentIdStr.length - 2
  )}.md`;

  return await getMdFileData(descriptionFileName);
}
