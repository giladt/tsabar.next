"use client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { Carousel } from "@/components/image-carousel/carousel";
import { LinkBtn } from "@/components/button";
import {
  CarouselImage,
  type TCarouselImage,
} from "../image-carousel/carousel-image";

type TCardProps = {
  url: string;
  heading: { name: string };
  description: string;
  images: TCarouselImage[];
};

export default function Card({
  url,
  heading,
  description,
  images,
}: TCardProps) {
  const router = useRouter();

  return (
    <section
      className="max-w-xs relative flex flex-col
        rounded-md cursor-default
      "
    >
      <Carousel
        wrapperTWStyles="overflow-hidden sm:rounded-md cursor-pointer shadow-lg"
        ariaLabel={`Apartment ${heading.name} photos.`}
        onClick={() => {
          router.push(`/${url}`);
        }}
      >
        {images.map((image: TCarouselImage, index: number) => (
          <CarouselImage
            key={uuidv4()}
            image={image}
            styles="h-full w-auto not:md:w-full mx-auto"
            size={{ w: 320, h: 320, type: "th" }}
            index={index}
          />
        ))}
      </Carousel>
      <div className="p-2">
        <h3>{heading.name}</h3>
        {description && <p>{description}</p>}
        <LinkBtn.CTX route={url}>More Details</LinkBtn.CTX>
      </div>
    </section>
  );
}
