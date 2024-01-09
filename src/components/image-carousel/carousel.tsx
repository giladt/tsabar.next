"use client";
import { wfImageUrl } from "@/utils/images";
import { Carousel as ReactResponsiveCarousel } from "react-responsive-carousel";
import { v4 as uuidv4 } from "uuid";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.scss";

import Image from "next/image";

type TImage = {
  id: string;
  description?: string;
  priority?: boolean;
};

type TCarouselProps = {
  images: TImage[];
  classNames: { wrapper?: string; image?: string };
  size: { w: number; h: number; type: "lg" | "th" };
  ariaLabel?: string;
  onClick?: () => void;
};

export function Carousel({
  images,
  classNames,
  ariaLabel = "",
  size,
  onClick,
}: TCarouselProps) {
  return (
    <ReactResponsiveCarousel
      className={classNames.wrapper}
      ariaLabel={ariaLabel}
      showThumbs={false}
      showIndicators={true}
      showStatus={false}
      showArrows={true}
      emulateTouch={true}
      centerMode={true}
      centerSlidePercentage={100}
      useKeyboardArrows={true}
      infiniteLoop={true}
      swipeScrollTolerance={25}
      preventMovementUntilSwipeScrollTolerance
      onClickItem={onClick}
    >
      {images.map((image: TImage, index: number) => (
        <Image
          key={uuidv4()}
          src={wfImageUrl(image.id, size.type)}
          alt={image.description || ""}
          width={size.w}
          height={size.h}
          priority={index === 0}
          className={classNames.image}
        />
      ))}
    </ReactResponsiveCarousel>
  );
}
