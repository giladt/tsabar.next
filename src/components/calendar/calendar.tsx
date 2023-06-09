"use client";
import { useState } from "react";
import {
  DAYS,
  MONTHS,
  type Range,
  TDateItem,
  TBookings,
} from "@/utils/types.d";
import { GrFormNext, GrFormPrevious } from "react-icons/gr/index.js";
import dayjs from "dayjs";

import { generateDate } from "@/utils/calendar";
import styles from "./calendar.module.scss";

interface TCalendarProps {
  bookings: TBookings;
}

export const Calendar = ({ bookings }: TCalendarProps) => {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  return (
    <div className={styles.calendar}>
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
                setToday(today.month(dayjs().month()).year(dayjs().year()));
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
          bookings || {},
          today.month() as Range<0, 11>,
          today.year()
        ).map(
          ({ date, currentMonth, today, booked }: TDateItem, index: number) => {
            return (
              <div
                key={index}
                className={`
                  ${styles.calDay} ${
                  (currentMonth &&
                    styles.currentMonth +
                      " font-bold text-gray-950 dark:text-gray-50") ||
                  "text-gray-500"
                } 
                  ${(today && styles.today) || ""}
                  ${(booked && styles.booked) || ""}
                `}
              >
                {date.date()}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
