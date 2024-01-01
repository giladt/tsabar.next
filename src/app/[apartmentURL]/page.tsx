import { Metadata } from "next";
import { redirect } from "next/navigation";
import * as ReactMdIcon from "react-icons/md";

import { Carousel } from "@/components/image-carousel/carousel";
import { TMdIcons, IApartmentData } from "@/utils/types.d";
import apartmentsData from "@/assets/apartments.json";

import Inquiry from "@/components/forms/inquiry";
import { getData, getMdFileData } from "@/utils/data-handlers";
import { RangeKeyDict } from "react-date-range";

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

export default async function Apartment({ params }: TPageParams) {
  const { apartmentURL } = params;

  const data = apartmentsData.find(
    (apartmentData) => apartmentData.url === encodeURI(apartmentURL || "-")
  ) as IApartmentData;

  if (!data) redirect("/");

  const { id, name, images, tags } = data;

  const bookings = await getApartmentBookingFromICal(id);

  const description = await getApartmentDescriptionFromFile(id);

  return (
    <main className="md:justify-center">
      {images && (
        <section className="overflow-hidden -mx-[calc(50svw-50%)] w-[calc(100svw-9px)]">
          <Carousel images={images} />
        </section>
      )}
      <header className="text-center mt-3 mb-14 max-md:px-5">
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

      {tags?.length && (
        <section className="flex flex-col py-5 max-md:px-5 gap-2">
          <div className="flex justify-center gap-2 flex-wrap">
            {tags.map(
              ({ icon, text }: { icon: TMdIcons; text: string }, index) => {
                const MdIcon = ReactMdIcon[icon];
                return (
                  <span
                    key={`tag-${index}`}
                    className="inline-flex items-center gap-1 rounded-full 
                      px-2 py-1 cursor-default font-semibold 
                      bg-white/25 hover:bg-white/50
                      transition-colors"
                  >
                    <MdIcon className="h-5 w-5" />
                    <div>{text}</div>
                  </span>
                );
              }
            )}
          </div>
        </section>
      )}

      {bookings && (
        <section className="flex flex-col py-5 max-md:px-5 gap-2 max-sm:px-5 justify-center">
          <h3>Availability</h3>
          <Inquiry apartment={{ id, name }} bookings={bookings} />
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
