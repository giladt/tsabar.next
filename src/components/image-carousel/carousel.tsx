"use client";
import { wfImageUrl } from "@/utils/images";
// import { Carousel as ReactResponsiveCarousel } from "react-responsive-carousel";
import { v4 as uuidv4 } from "uuid";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const settings: Settings = {
    infinite: true,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: true,
    lazyLoad: "progressive",
  };

  const CarouselImages = images.map((image: TImage, index: number) => (
    <Image
      key={uuidv4()}
      className="h-[50svh] md:h-[81svh] w-full"
      src={wfImageUrl(image.id, "lg")}
      alt={image.description || ""}
      width={1000}
      height={700}
      priority={index === 0}
    />
  ));
  return (
    <Slider {...settings} className="h-[50svh] md:h-[81svh] w-full">
      {...CarouselImages}
    </Slider>
  );
}
