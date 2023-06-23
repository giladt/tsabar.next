"use client";
import { Carousel } from "react-responsive-carousel";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { wfImageUrl } from "@/utils/images";

import styles from "./card.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
});

type TCardProps = {
  url: string;
  name: string;
  info: string;
  images: {
    id: string;
    description?: string;
    priority?: boolean;
  }[];
};

export default function Card({ url, name, info, images }: TCardProps) {
  const router = useRouter();

  return (
    <section className={styles.card}>
      <Carousel
        className={styles.card__gallery}
        ariaLabel={`Apartment ${name} photos.`}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        showArrows={true}
        onClickItem={(index: number) => {
          router.push(`/${url}`);
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
        <Link
          role="button"
          type="button"
          className="mt-5 btn-root outline outline-teal-300 hover:bg-teal-300 focus:bg-teal-400
          dark:outline-teal-700 dark:hover:bg-teal-700 dark:focus:bg-teal-600"
          href={url}
        >
          More details
        </Link>
      </div>
    </section>
  );
}
