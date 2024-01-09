"use client";
import { useRouter } from "next/navigation";

import { Carousel } from "@/components/image-carousel/carousel";
import { LinkBtn } from "@/components/button";

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
    <section
      className="max-w-xs relative flex flex-col
        rounded-md cursor-default
      "
    >
      <Carousel
        size={{ w: 320, h: 320, type: "th" }}
        classNames={{
          wrapper: "overflow-hidden sm:rounded-md cursor-pointer shadow-lg",
          image: "h-full w-auto not:md:w-full mx-auto",
        }}
        ariaLabel={`Apartment ${name} photos.`}
        onClick={() => {
          router.push(`/${url}`);
        }}
        images={images}
      />
      <div className="p-2">
        <h3>{name}</h3>
        {info && <p>{info}</p>}
        <LinkBtn.CTX route={url}>More Details</LinkBtn.CTX>
      </div>
    </section>
  );
}
