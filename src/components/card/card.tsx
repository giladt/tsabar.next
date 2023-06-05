"use client";
import React from "react";
import { TBookings } from "@/utils/types.d";
import { ImgCarousel } from "../img-carousel/img-carousel";

import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "@/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import styles from "./card.module.scss";

import { setIsOpen, setStartupDialogContent } from "@/store/dialogSlice";

type TCardProps = {
  apartment: {
    id: number;
    name: string;
    info: string;
    images: {
      id: string;
      description?: string;
    }[];
    bookings?: TBookings;
    tags?: string[];
  };
};

export default function Card({ apartment }: TCardProps) {
  const wfImage = (id: string, size: "th" | "lg") =>
    `https://wunderflatsng.blob.core.windows.net/imagesproduction/${id}${
      size === "th" ? "-thumbnail" : size === "lg" ? "-large" : ""
    }.jpg`;

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.dialog.isOpen);

  return (
    <div className={styles.card}>
      <div className={styles["card-container"]}>
        <ImgCarousel images={apartment.images} />
        <div className={styles.text}>
          <h3 className={styles.text__description_head}>{apartment.name}</h3>
          {apartment.info && (
            <p className={styles.text__description_body}>{apartment.info}</p>
          )}
        </div>
        {apartment.tags && (
          <div className={styles.tags}>
            {apartment.tags.map((tag, index) => (
              <span
                key={`tag-${index}`}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <button
          className={styles.button}
          onClick={() => {
            dispatch(setIsOpen(true));
            dispatch(setStartupDialogContent(`calendar|${apartment.name}`));
          }}
        >
          Check Availability
        </button>
      </div>
    </div>
  );
}
