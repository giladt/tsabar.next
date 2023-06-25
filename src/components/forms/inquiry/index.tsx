"use client";
import { useState, FormEvent } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import {
  DateRangeType,
  DateValueType,
} from "react-tailwindcss-datepicker/dist/types";
import dayjs, { Dayjs } from "dayjs";

import FormField from "@/components/forms/form-input/form-field";
import TextInput from "@/components/forms/form-input/text-input";

import styles from "./inquiry.module.scss";

type TInquiryProps = {
  bookings: DateRangeType[];
};

export default function Inquiry({ bookings }: TInquiryProps) {
  const today: Dayjs = dayjs();
  const minDate = today.toDate();

  const [inquiryInput, setInquiryInput] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, tenants, name_first, name_last } = event.currentTarget;
    console.log({
      startDate: inquiryInput?.startDate,
      endDate: inquiryInput?.endDate,
      email: email.value,
      tenants: tenants.value,
      name_first: name_first.value,
      name_last: name_last.value,
    });
  };

  const firstDateOfMonth = (date: Dayjs) =>
    dayjs()
      .year(date.get("year"))
      .month(date.get("month"))
      .startOf("month")
      .toDate();

  const darkStyles = {
    container: `dark:placeholder-primary-dark
      dark:focus-within:border-primary-dark
      dark:focus-visible:border-primary-dark
      dark:text-white
      dark:border-white/50
    `,
    input: `
      dark:text-white 
      dark:placeholder-white
    `,
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Datepicker
          primaryColor="teal"
          separator=" to "
          displayFormat="DD/MM/YYYY"
          containerClassName={`
            ${styles.container}
            ${darkStyles.container}
          `}
          inputClassName={`
            ${styles.input}
            ${darkStyles.input}
          `}
          placeholder="Select wished stay dates"
          value={inquiryInput}
          startWeekOn="mon"
          startFrom={firstDateOfMonth(today)}
          minDate={minDate}
          onChange={setInquiryInput}
          disabledDates={bookings}
          showFooter
        />
        <div>
          <TextInput name="name_first" label="First Name" />
          <TextInput name="name_last" label="Last Name" />
        </div>
        <TextInput name="email" label="E-Mail" type="email" />
        <TextInput
          name="tenants"
          label="Number of tenants (Max 2)"
          type="number"
          min={1}
          max={2}
        />
        <FormField>
          <button type="submit">Send your inquiry</button>
        </FormField>
      </form>
    </>
  );
}
