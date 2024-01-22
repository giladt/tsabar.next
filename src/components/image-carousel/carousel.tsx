"use client";
import React, { ReactNode } from "react";
import {
  CarouselProps,
  Carousel as ReactResponsiveCarousel,
} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.scss";

export type TCarouselProps = {
  wrapperTWStyles?: string;
  ariaLabel?: string;
  onClick?: () => void;
  children: ReactNode;
};

const carouselOptions: Partial<CarouselProps> = {
  showThumbs: false,
  showIndicators: true,
  showStatus: false,
  showArrows: true,
  emulateTouch: true,
  centerMode: true,
  centerSlidePercentage: 100,
  useKeyboardArrows: true,
  infiniteLoop: true,
  swipeScrollTolerance: 25,
  preventMovementUntilSwipeScrollTolerance: true,
};

export const Carousel = ({
  wrapperTWStyles = "",
  ariaLabel = "",
  onClick,
  children,
}: TCarouselProps) => {
  carouselOptions.className = wrapperTWStyles;
  carouselOptions.ariaLabel = ariaLabel;
  carouselOptions.onClickItem = onClick;

  return (
    <ReactResponsiveCarousel {...carouselOptions}>
      {/* 
      // @ts-ignore: deprecated type */}
      {children}
    </ReactResponsiveCarousel>
  );
};
