"use client";
import { wfImageUrl } from "@/utils/images";
import { Carousel as ReactResponsiveCarousel } from "react-responsive-carousel";
import { v4 as uuidv4 } from "uuid";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import styles from "./carousel.module.scss";

type TImage = {
  id: string;
  description?: string;
  priority?: boolean;
};

type TCarouselProps = {
  images: TImage[];
};

export function Carousel({ images }: TCarouselProps) {
  return (
    <ReactResponsiveCarousel
      className={styles.carousel}
      ariaLabel={`Apartment photos.`}
      showThumbs={false}
      showIndicators={true}
      showStatus={false}
      showArrows={true}
      emulateTouch={true}
      centerMode={true}
      centerSlidePercentage={100}
      useKeyboardArrows
    >
      {images.map((image: TImage) => (
        <div key={uuidv4()} className={styles.images}>
          <img src={wfImageUrl(image.id, "lg")} alt={image.description || ""} />
        </div>
      ))}
    </ReactResponsiveCarousel>
  );
}
