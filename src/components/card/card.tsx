"use client";
import { Carousel } from "react-responsive-carousel";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { wfImageUrl } from "@/utils/images";
import Fonts from "@/utils/fonts";

import styles from "./card.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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
        <h3 className={Fonts.cnDancing}>{name}</h3>
        {info && <p>{info}</p>}
        <Link role="button" type="button" href={url}>
          More details
        </Link>
      </div>
    </section>
  );
}
