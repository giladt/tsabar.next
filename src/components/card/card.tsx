"use client";
import { useRouter } from "next/navigation";
import { v5 as uuidv5 } from "uuid";

// import { Carousel } from "@/components/image-carousel/carousel";
import { LinkBtn } from "@/components/button";
import {
  CarouselImage,
  type TCarouselImage,
} from "../image-carousel/carousel-image";
import useEmblaCarousel from 'embla-carousel-react'

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
  const [emblaRef] = useEmblaCarousel()

  return (
    <section
      className="max-w-xs relative flex flex-col
        rounded-md cursor-default
      "
    >
    <div
      className="overflow-hidden rounded-md" 
      ref={emblaRef}
      onClick={() => {
        router.push(`/${url}`);
      }}
    >
      <div className="flex cursor-pointer shadow-lg h-[320px] w-[320px] relative">
        {images.map((image: TCarouselImage, index: number) => (
          <CarouselImage
            key={uuidv5(`image-${image.id}-${index}`, uuidv5.URL)}
            image={image}
            styles="flex-0"
            size={{ w: Math.max(320 * image.width / image.height), h: Math.max(320 * image.height / image.width), type: "th" }}
            index={index}
          />
        ))}
      </div>
    </div>
{/* 
      <Carousel
        wrapperTWStyles="overflow-hidden sm:rounded-md cursor-pointer shadow-lg relative"
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
      </Carousel> */}
      <div className="p-2">
        <h3>{heading.name}</h3>
        {description && <p>{description}</p>}
        <LinkBtn.CTX route={url}>More Details</LinkBtn.CTX>
      </div>
    </section>
  );
}
