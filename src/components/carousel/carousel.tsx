"use client";
import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./carousel.module.scss";
import { v5 as uuidv5 } from "uuid";

type TCarouselProps = {
  images: { id: string; description?: string }[] | null;
  currentImage: number;
  setCurrentImage: Dispatch<SetStateAction<number>>;
};

export const Carousel = ({
  images,
  currentImage,
  setCurrentImage,
}: TCarouselProps) => {
  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const carouselRef = useRef<HTMLUListElement>(null);

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
      carouselRef.current !== null &&
      carouselRef.current.offsetWidth * currentImage < maxScrollWidth
    ) {
      setCurrentImage((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === "prev") {
      return currentImage <= 0;
    }

    if (direction === "next" && carouselRef.current !== null) {
      return carouselRef.current.offsetWidth * currentImage >= maxScrollWidth;
    }

    return false;
  };

  useEffect(() => {
    if (carouselRef?.current) {
      carouselRef.current.scrollLeft =
        carouselRef.current.offsetWidth * currentImage;
    }
  }, [currentImage]);

  useEffect(() => {
    const handleResize = () => {
      setMaxScrollWidth(
        carouselRef.current
          ? carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
          : 0
      );
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!images || !images.length) return null;
  return (
    <section id="ts-carousel" className={`${styles.carousel}`}>
      <div
        className={styles.carousel__figure}
        style={{
          backgroundImage: `url(${
            wfImage(images[currentImage].id, "lg") || ""
          })`,
        }}
      >
        {images[currentImage].description && (
          <h2 className={styles.carousel__figure_header}>
            {images[currentImage].description}
          </h2>
        )}
      </div>

      <div className={`${styles.carousel__slider}`}>
        {maxScrollWidth > 0 && (
          <div
            className={`${styles.carousel__slider__nav} flex justify-between absolute top left w-full h-full max-sm`}
          >
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
          ref={carouselRef}
          className={`${styles.carousel__slider__container}`}
        >
          {images.map((image, index) => {
            return (
              <CarouselImage
                url={wfImage(image.id, "th")}
                description={image.description || ""}
                key={index}
                isActive={index === currentImage}
                currentIndex={index}
                currentImage={currentImage}
                onClick={() => {
                  setCurrentImage(index);
                }}
              />
            );
          })}
        </ul>
      </div>
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
  isActive: boolean;
  currentIndex: number;
  currentImage: number;
  onClick: () => void;
};
const CarouselImage = ({
  url,
  description,
  isActive,
  currentImage,
  currentIndex: index,
  onClick,
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
        onChange={onClick}
        value={index}
        className="hidden"
      />
      <label htmlFor={elId} style={{ backgroundImage: `url(${url || ""})` }} />
      <div className={isActive ? "opacity-100" : "opacity-0"} onClick={onClick}>
        <h3>{description}</h3>
      </div>
    </li>
  );
};
