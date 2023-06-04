import { FC, useState } from "react";
import { generateDate } from "@/utils/calendar";
import { DAYS, MONTHS, type Range } from "@/utils/types.d";
import { GrFormNext, GrFormPrevious } from "react-icons/gr/index.js";

import dayjs from "dayjs";
import styles from "./calendar.module.scss";
import { TBookings } from "@/utils/types.d";

interface TCalendarProps {
  apartment: string;
  bookings: TBookings;
  className: string;
}

export const Calendar: FC<TCalendarProps> = ({
  apartment,
  bookings,
  className,
}): JSX.Element => {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

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
          bookings,
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
};
