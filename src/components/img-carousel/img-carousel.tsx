"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./img-carousel.module.scss";
import { Carousel } from "../carousel/carousel";

type TCarouselProps = {
  images: { id: string; description?: string }[] | null;
};

export const ImgCarousel = ({ images }: TCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const carouselRef = useRef<HTMLUListElement>(null);

  const [modalImages, setModalImages] = useState<
    { id: string; description?: string }[] | null
  >(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wfImage = (id: string, size: "th" | "lg") =>
    `https://wunderflatsng.blob.core.windows.net/imagesproduction/${id}${
      size === "th" ? "-thumbnail" : size === "lg" ? "-large" : ""
    }.jpg`;

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carouselRef.current !== null &&
      carouselRef.current.offsetWidth * currentIndex < maxScrollWidth
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carouselRef.current !== null) {
      return carouselRef.current.offsetWidth * currentIndex >= maxScrollWidth;
    }

    return false;
  };

  useEffect(() => {
    if (carouselRef !== null && carouselRef.current !== null) {
      carouselRef.current.scrollLeft =
        carouselRef.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

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
        <ul ref={carouselRef} className={styles.carousel__container}>
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
                onClick={() => {
                  setModalImages(images);
                  setIsOpen(true);
                }}
              />
            );
          })}
        </ul>
      </div>
      <Dialog
        images={modalImages}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
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
  onClick: () => void;
};
const CarouselImage = ({
  url,
  description,
  currentImage,
  index,
  onChange: onChange,
  onClick: onClick,
}: TCarouselImage) => {
  return (
    <li className={styles.carousel__image}>
      <input
        type="radio"
        title={description}
        name={`carousel-image`}
        id={`carousel-image-${index}`}
        checked={currentImage === index}
        onChange={onChange}
        onClick={onClick}
        value={index}
        className="hidden"
      />
      <label
        htmlFor={`carousel-image-${index}`}
        style={{ backgroundImage: `url(${url || ""})` }}
      />
    </li>
  );
};

type TDialogProps = {
  images?: { id: string; description?: string }[] | null;
  isOpen?: boolean;
  onClose: () => void;
};
const Dialog = ({ images = null, isOpen = false, onClose }: TDialogProps) => {
  return (
    <dialog open={isOpen} className={styles.dialog}>
      <button className={styles.button_close} onClick={onClose}>
        X
      </button>
      <Carousel images={images} />
    </dialog>
  );
};
