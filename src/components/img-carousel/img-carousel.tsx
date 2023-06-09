"use client";
import React, { useState, useRef, useEffect } from "react";
import { v5 as uuidv5 } from "uuid";
import styles from "./img-carousel.module.scss";
import { Carousel } from "../carousel/carousel";
import { Dialog } from "../dialog/dialog";

type TCarouselProps = {
  images: { id: string; description?: string }[] | null;
};

export const ImgCarousel = ({ images }: TCarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const refCarousel = useRef<HTMLUListElement>(null);
  const refDialogGallery = useRef<HTMLDialogElement | null>(null);

  const wfImage = (id: string, size: "th" | "lg") =>
    `https://wunderflatsng.blob.core.windows.net/imagesproduction/${id}${
      size === "th" ? "-thumbnail" : size === "lg" ? "-large" : ""
    }.jpg`;

  const movePrev = () => {
    if (currentImage > 0) {
      setCurrentImage((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      refCarousel.current !== null &&
      refCarousel.current.offsetWidth * currentImage < maxScrollWidth
    ) {
      setCurrentImage((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === "prev") {
      return currentImage <= 0;
    }

    if (direction === "next" && refCarousel.current !== null) {
      return refCarousel.current.offsetWidth * currentImage >= maxScrollWidth;
    }

    return false;
  };

  useEffect(() => {
    if (refCarousel !== null && refCarousel.current !== null) {
      refCarousel.current.scrollLeft =
        refCarousel.current.offsetWidth * currentImage;
    }
  }, [currentImage]);

  useEffect(() => {
    const handleResize = () => {
      setMaxScrollWidth(
        refCarousel.current
          ? refCarousel.current.scrollWidth - refCarousel.current.offsetWidth
          : 0
      );
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!images || !images.length) return null;
  return (
    <section id="ts-img-carousel" className={styles.carousel}>
      <div className={styles.nav}>
        {maxScrollWidth > 0 && (
          <div className={styles.navButtons}>
            <NavButton
              direction="prev"
              onClick={movePrev}
              disabled={isDisabled("prev")}
            />
            <NavButton
              direction="next"
              onClick={moveNext}
              disabled={isDisabled("next")}
            />
          </div>
        )}
        <ul
          ref={refCarousel}
          className={styles.carousel__container}
          onClick={(e) => {
            e.preventDefault();
            refDialogGallery.current?.showModal();
          }}
        >
          {images.map((image, index) => {
            return (
              <CarouselImage
                url={wfImage(image.id, "th")}
                description={image.description || ""}
                key={index}
                index={index}
                currentImage={currentImage}
                onChange={() => {
                  setCurrentImage(index);
                }}
              />
            );
          })}
        </ul>
      </div>
      <Dialog ref={refDialogGallery} type="gallery">
        <Carousel
          images={images}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
      </Dialog>
    </section>
  );
};

type TNavButtonProps = {
  direction: "next" | "prev";
  onClick: () => void;
  disabled: boolean;
};
const NavButton = ({ direction, onClick, disabled }: TNavButtonProps) => (
  <button onClick={onClick} className={styles.nav_button} disabled={disabled}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {direction === "prev" ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      )}
    </svg>
    <span>{direction}</span>
  </button>
);

type TCarouselImage = {
  url: string;
  description: string;
  index: number;
  currentImage: number;
  onChange: () => void;
};
const CarouselImage = ({
  url,
  description,
  currentImage,
  index,
  onChange: onChange,
}: TCarouselImage) => {
  const elId = uuidv5(url, "c5cd61c8-c5b8-442c-9d60-d66c180a857a");
  return (
    <li className={styles.carousel__image}>
      <input
        type="radio"
        title={description}
        name={`carousel-image`}
        id={elId}
        checked={currentImage === index}
        onChange={onChange}
        value={index}
        className="hidden"
      />
      <label htmlFor={elId} style={{ backgroundImage: `url(${url || ""})` }} />
    </li>
  );
};
