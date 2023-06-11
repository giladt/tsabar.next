"use client";
import { useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import * as ReactMdIcon from "react-icons/md";

import { Dialog } from "@/components/dialog/dialog";
import { Calendar } from "@/components/calendar/calendar";
import { wfImageUrl } from "@/utils/images";
import { TBookings, TMdIcons } from "@/utils/types.d";

import styles from "./card.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { TbCalendar } from "react-icons/tb";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
});

type TCardProps = {
  name: string;
  info: string;
  images: {
    id: string;
    description?: string;
    priority?: boolean;
  }[];
  tags?: { icon: TMdIcons; text: string }[];
  bookings?: TBookings;
};

export default function Card({
  name,
  info,
  images,
  tags = [],
  bookings = {},
}: TCardProps) {
  const refDialogCalendar = useRef<HTMLDialogElement | null>(null);
  const refDialogGallery = useRef<HTMLDialogElement | null>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);

  return (
    <>
      <section className={`${styles.card} bg-slate-100 dark:bg-slate-900`}>
        <Carousel
          className={styles.card__gallery}
          ariaLabel={`Apartment ${name} photos.`}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          showArrows={true}
          onClickItem={(index: number) => {
            setCurrentImage(index);
            refDialogGallery.current?.showModal();
          }}
          emulateTouch={true}
          useKeyboardArrows
        >
          {images.map((image) => (
            <Image
              key={uuidv4()}
              src={wfImageUrl(image.id, "th")}
              alt={image.description || ""}
              width={320}
              height={320}
              priority={image.priority || false}
            />
          ))}
        </Carousel>
        <div className={styles.card__info}>
          <h3 className={dancing.className}>{name}</h3>
          {info && <p>{info}</p>}
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
          <button
            className="btn-root bg-teal-800 text-teal-50 hover:bg-teal-700 focus:bg-teal-600
            dark:bg-teal-200 dark:text-teal-950 dark:hover:bg-teal-300 dark:focus:bg-teal-400"
            onClick={() => refDialogCalendar.current?.showModal()}
          >
            <TbCalendar /> Check Availability
          </button>
        </div>
      </section>
      <Dialog ref={refDialogCalendar} type="calendar">
        <h3>{name} Availability</h3>
        <Calendar bookings={bookings} />
      </Dialog>
      <Dialog ref={refDialogGallery} type="gallery">
        <Carousel
          className="max-[80%]"
          ariaLabel={`Apartment ${name} photos.`}
          showThumbs={false}
          showIndicators={true}
          showArrows={true}
          centerMode={false}
          showStatus={false}
          emulateTouch={true}
          selectedItem={currentImage || 0}
          useKeyboardArrows
        >
          {images.map((image) => (
            <div
              key={uuidv4()}
              className={styles.card__fs_gallery_image}
              style={{
                backgroundImage: `url(${wfImageUrl(image.id, "lg")})`,
              }}
              aria-label={image.description || ""}
            />
          ))}
        </Carousel>
      </Dialog>
    </>
  );
}
