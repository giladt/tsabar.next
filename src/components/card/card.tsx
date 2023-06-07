"use client";
import { useRef } from "react";
import { TBookings } from "@/utils/types.d";
import { ImgCarousel } from "../img-carousel/img-carousel";

import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "@/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import styles from "./card.module.scss";

import { Dialog } from "@/components/dialog/dialog";
import Calendar from "../calendar/calendar";

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
  const refDialogCalendar = useRef<HTMLDialogElement | null>(null);

  return (
    <div className={`${styles.card} text-left text-sm`}>
      <div className={styles["card-container"]}>
        <ImgCarousel images={apartment.images} />
        <div className="px-0 py-4">
          <h1 className="prose text-gray-900 dark:text-gray-100 font-bold text-xl m-0 mb-2">
            {apartment.name}
          </h1>
          {apartment.info && <p className="text-base my-2">{apartment.info}</p>}
        </div>
        {apartment.tags && (
          <div className={styles.tags}>
            {apartment.tags.map((tag, index) => (
              <span key={`tag-${index}`} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <button
          className="w-full h-10 rounded-lg
          bg-teal-800 text-teal-50 hover:bg-teal-700 focus:bg-teal-600
          dark:bg-teal-200 dark:text-teal-950 dark:hover:bg-teal-300 dark:focus:bg-teal-400
          active:ring-2 ring-offset-2 ring-black dark:ring-stone-400"
          onClick={() => refDialogCalendar.current?.showModal()}
        >
          Check Availability
        </button>
      </div>
      <Dialog ref={refDialogCalendar} type="calendar">
        <h1>{apartment.name} Availability</h1>
        <Calendar apartment={apartment.name} className={styles.calendar} />
      </Dialog>
    </div>
  );
}
