"use client";
import { wfImageUrl } from "@/utils/images";
import { Carousel as ReactResponsiveCarousel } from "react-responsive-carousel";
import { v4 as uuidv4 } from "uuid";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Image from "next/image";

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
      className="h-[clamp(81svh,500px,calc(100svh-5rem))]"
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
      {images.map((image: TImage, index: number) => (
        <div
          key={uuidv4()}
          className="h-[clamp(81svh,500px,calc(100svh-5rem))]
          flex w-full items-center relative"
        >
          <Image
            src={wfImageUrl(image.id, "lg")}
            alt={image.description || ""}
            fill
            priority={index === 0}
            className="w-full h-full object-cover object-center bg-slate-700"
          />
        </div>
      ))}
    </ReactResponsiveCarousel>
  );
}
