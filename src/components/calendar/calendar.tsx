"use client";
import { useState } from "react";

import Datepicker from "react-tailwindcss-datepicker";
import {
  DateRangeType,
  DateValueType,
} from "react-tailwindcss-datepicker/dist/types";
import dayjs, { Dayjs } from "dayjs";
import styles from "./calendar.module.scss";

interface TCalendarProps {
  bookings: DateRangeType[];
}

export const Calendar = ({ bookings }: TCalendarProps) => {
  const [inquiryInput, setInquiryInput] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const today: Dayjs = dayjs();
  const maxBookingLength: [number, dayjs.ManipulateType | undefined] = [
    3,
    "years",
  ];
  const minDate = today.toDate();

  const firstDateOfMonth = (date: Dayjs) =>
    dayjs()
      .year(date.get("year"))
      .month(date.get("month"))
      .startOf("month")
      .toDate();

  const handleValueChange = (newValue: DateValueType): void => {
    if (
      dayjs(newValue?.endDate).isAfter(
        dayjs(newValue?.startDate).add(...maxBookingLength)
      )
    ) {
      throw new Error("Booking period is too long.");
    }
    setInquiryInput(newValue);
  };

  return (
    <Datepicker
      containerClassName={`
        ${styles.container}
        placeholder-[var(--primary-light)] dark:placeholder-[var(--primary-dark)]
        focus-within:border-[var(--primary-light)] dark:focus-within:border-[var(--primary-dark)]
        focus-visible:border-[var(--primary-light)] dark:focus-visible:border-[var(--primary-dark)]
        text-black dark:text-white
        border-black/50 dark:border-white/50
      `}
      inputClassName={`
        ${styles.input}
        text-black dark:text-white 
        placeholder-black dark:placeholder-white
      `}
      placeholder="Select wished stay dates"
      value={inquiryInput}
      startWeekOn="mon"
      startFrom={firstDateOfMonth(today)}
      minDate={minDate}
      onChange={handleValueChange}
      disabledDates={bookings}
      showFooter
    />
  );
};
