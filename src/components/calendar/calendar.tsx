"use client";
import { FC, useState } from "react";
import { DAYS, MONTHS, type Range } from "@/utils/types.d";
import { GrFormNext, GrFormPrevious } from "react-icons/gr/index.js";
import dayjs from "dayjs";

import { generateDate } from "@/utils/calendar";
import styles from "./calendar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";

import { RootState, AppDispatch } from "@/store";

// export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface TCalendarProps {
  apartment: string;
  className: string;
}

export default function Calendar({ apartment, className }: TCalendarProps) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const apartments = useAppSelector(
    (state) => state.apartments.startupApartments
  );

  const apartmentData = apartments.find((apt) => apt.name === apartment);
  const bookings = apartmentData?.bookings;

  return (
    <div className={className}>
      <div>
        <div className={styles.calNav}>
          {MONTHS[today.month()]}, {today.year()}
          <div className={styles.selectDates}>
            <GrFormPrevious
              className={`${styles.arrows} ${
                !today.isAfter(dayjs().endOf("month")) ? styles.disabled : ""
              }`}
              onClick={() => {
                if (today.isAfter(dayjs().endOf("month"))) {
                  setToday(today.month(today.month() - 1));
                }
              }}
            />
            <div
              className={styles.today}
              role="button"
              onClick={() => {
                setToday(today.month(dayjs().month()));
              }}
            >
              Today
            </div>
            <GrFormNext
              className={styles.arrows}
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.calHead}>
        {DAYS.map((day, index) => (
          <div className={styles.calHeadDay} key={index}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.calContainer}>
        {generateDate(
          apartment,
          bookings || {},
          today.month() as Range<0, 11>,
          today.year()
        ).map(({ date, currentMonth, today, booked }: any, index: number) => {
          return (
            <div
              key={index}
              className={`
                  ${styles.calDay} ${
                (currentMonth && styles.currentMonth) || ""
              } 
                  ${(today && styles.today) || ""}
                  ${(booked && styles.booked) || ""}
                `}
            >
              {date.date()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
