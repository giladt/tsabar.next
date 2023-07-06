"use client";
import { useState, useEffect, FormEvent, ChangeEvent, FocusEvent } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import {
  DateRangeType,
  DateValueType,
} from "react-tailwindcss-datepicker/dist/types";
import dayjs, { Dayjs } from "dayjs";

import FormField from "@/components/forms/form-input/form-field";
import TextInput from "@/components/forms/form-input/text-input";
import RadioInput from "@/components/forms/form-input/radio-input";

type TInquiryProps = {
  bookings: DateRangeType[];
};

export type TFields =
  | "email"
  | "name_first"
  | "name_last"
  | "tenants"
  | "date_inquiry";

export type TValue = { text: string; isDirty: boolean; error?: string };

export default function Inquiry({ bookings }: TInquiryProps) {
  const today: Dayjs = dayjs();
  const minDate = today.toDate();

  const [inquiryInput, setInquiryInput] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const [value, setValue] = useState<{
    [name in TFields]: TValue;
  }>({
    email: { text: "", isDirty: false, error: "" },
    name_first: { text: "", isDirty: false, error: "" },
    name_last: { text: "", isDirty: false, error: "" },
    tenants: { text: "", isDirty: false, error: "" },
    date_inquiry: { text: "", isDirty: false, error: "" },
  });

  const ValidEmail =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const doValidation = (field: TFields, value: string): string => {
    switch (true) {
      case field === "date_inquiry" && !value.length:
      case field === "name_first" && !value.length:
      case field === "name_last" && !value.length:
      case field === "email" && !value.length:
      case field === "tenants" && !["1", "2"].includes(value):
        return "Required";
      case field === "email" && !ValidEmail.test(value):
        return "Email Invalid";
      default:
        return "";
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;
    Object.entries(value).forEach(([name, value]: [string, TValue]) => {
      const error: string = doValidation(name as TFields, value.text);
      if (error) isValid = false;

      if (!value.isDirty) {
        setValue((prev) => {
          return {
            ...prev,
            [name]: { text: value.text, isDirty: true, error },
          };
        });
      }
    });
  };

  const firstDateOfMonth = (date: Dayjs) =>
    dayjs()
      .year(date.get("year"))
      .month(date.get("month"))
      .startOf("month")
      .toDate();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValue((prev) => {
      return {
        ...prev,
        [name as TFields]: {
          ...prev[name as TFields],
          text: value,
          isDirty: true,
        },
      };
    });
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValue((prev) => {
      return {
        ...prev,
        [name as TFields]: {
          ...prev[name as TFields],
          error: doValidation(name as TFields, value),
        },
      };
    });
  };

  const handleDateChange = (
    value: DateValueType,
    e?: HTMLInputElement | null | undefined
  ) => {
    setInquiryInput(value);
    setValue((prev) => {
      return {
        ...prev,
        date_inquiry: {
          text:
            `${value?.startDate?.toString() || ""}|${
              value?.startDate?.toString() || ""
            }` || "",
          isDirty: true,
          error: doValidation(
            "date_inquiry",
            `${value?.startDate?.toString() || ""}${
              value?.startDate?.toString() || ""
            }`
          ),
        },
      };
    });
  };

  const handleWindowResize = () => {
    const checkIsMobile = (windowWidth: number): boolean => windowWidth <= 768;

    setIsMobile(checkIsMobile(window.innerWidth));
  };

  useEffect(() => {
    if (window) {
      handleWindowResize();
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []);

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField>
          <Datepicker
            primaryColor="teal"
            separator=" to "
            useRange={!isMobile}
            showFooter
            displayFormat="DD/MM/YYYY"
            containerClassName={`
              relative transition-all duration-150
              w-full flex items-center bg-transparent 
              border-2 rounded-lg outline-none
              disabled:opacity-40 disabled:cursor-not-allowed 
              placeholder-primary-dark dark:placeholder-primary-dark
              focus-within:border-primary-dark dark:focus-within:border-primary-dark
              focus-visible:border-primary-dark dark:focus-visible:border-primary-dark
              text-black dark:text-white
              border-black/50 dark:border-white/50
              ${value.date_inquiry.error ? "border-tertiary-dark" : ""}
            `}
            inputClassName={`
              relative transition-all duration-150
              w-full py-2.5 pl-4 pr-14 
              bg-transparent 
              outline-none
              disabled:opacity-40 disabled:cursor-not-allowed;
              text-black placeholder-black
              dark:text-white dark:placeholder-white
            `}
            placeholder="Select wished stay dates"
            value={inquiryInput}
            startWeekOn="mon"
            startFrom={firstDateOfMonth(today)}
            minDate={minDate}
            onChange={handleDateChange}
            disabledDates={bookings}
          />
        </FormField>
        <div className="flex flex-row gap-4 flex-wrap">
          <TextInput
            name="name_first"
            value={value.name_first}
            onChange={handleChange}
            onBlur={handleBlur}
            label="First Name"
          />
          <TextInput
            name="name_last"
            value={value.name_last}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Last Name"
          />
        </div>

        <TextInput
          name="email"
          value={value.email}
          onChange={handleChange}
          onBlur={handleBlur}
          label="E-Mail"
          type="email"
        />

        <RadioInput
          name="tenants"
          value={value.tenants}
          onChange={(e) => {
            handleChange(e);
            handleBlur(e as FocusEvent<HTMLInputElement>);
          }}
          options={[
            { value: "1", label: "1 Tenant" },
            { value: "2", label: "2 Tenants" },
          ]}
        />

        <FormField>
          <button
            type="submit"
            className="p-2 mt-7 mb-8
              border-2 border-solid border-primary-dark 
              rounded-lg text-center hover:text-black
              bg-transparent hover:bg-primary-dark
            "
          >
            Send your inquiry
          </button>
        </FormField>
      </form>
    </>
  );
}
