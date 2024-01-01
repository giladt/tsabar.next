"use client";
import {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  FocusEvent,
  useRef,
} from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { addDays, format, isBefore } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "@/components/forms/inquiry/calendar.scss";

import FormField from "@/components/forms/form-input/form-field";
import TextInput from "@/components/forms/form-input/text-input";
import RadioInput from "@/components/forms/form-input/radio-input";
import { Dialog } from "@/components/dialog/dialog";
import { Button } from "@/components/button";
import { SendConfirmation } from "../sendConfirmationDialog";

type TInquiryProps = {
  bookings: RangeKeyDict["bookings"][];
  apartment: { id: number; name: string };
};

const dates: Date[] = [];

export type TFields =
  | "email"
  | "name_first"
  | "name_last"
  | "tenants"
  | "comment"
  | "date_inquiry"
  | "apartment";

export type TValue = { text: string; isDirty: boolean; error?: string };

export default function Inquiry({ apartment, bookings }: TInquiryProps) {
  const ref = useRef<HTMLDialogElement>(null);

  const [inquiryInput, setInquiryInput] = useState<RangeKeyDict["selection"]>({
    startDate: undefined,
    endDate: new Date(""),
    key: "selection",
  });

  const [response, setResponse] = useState<number | null>(null);
  const [value, setValue] = useState<{
    [name in TFields]: TValue;
  }>({
    email: { text: "", isDirty: false, error: "" },
    name_first: { text: "", isDirty: false, error: "" },
    name_last: { text: "", isDirty: false, error: "" },
    tenants: { text: "", isDirty: false, error: "" },
    comment: { text: "", isDirty: false, error: "" },
    date_inquiry: { text: "", isDirty: false, error: "" },
    apartment: { text: "", isDirty: false, error: "" },
  });

  const ValidEmail =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const doValidation = (field: TFields, value: string): string => {
    switch (true) {
      case field === "date_inquiry" && value.length <= 1:
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
    setValue((prev) => {
      return {
        ...prev,
        apartment: {
          text: `WE${apartment.id} (${apartment.name})`,
          isDirty: true,
          error: "",
        },
      };
    });
    if (isValid) {
      ref.current?.showModal();
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    ranges: RangeKeyDict,
    e?: HTMLInputElement | null | undefined
  ) => {
    const { selection } = ranges;
    setInquiryInput(selection);
    setValue((prev) => {
      return {
        ...prev,
        date_inquiry: {
          text:
            `${selection.startDate?.toString() || ""}|${
              selection.endDate?.toString() || ""
            }` || "",
          isDirty: true,
          error: doValidation(
            "date_inquiry",
            `${selection.startDate?.toString() || ""}|${
              selection.endDate?.toString() || ""
            }`
          ),
        },
      };
    });
  };

  const clearForm = () => {
    const emptyField: TValue = {
      text: "",
      isDirty: false,
      error: undefined,
    };
    const emptyForm: {
      [name in TFields]: TValue;
    } = {
      email: emptyField,
      name_first: emptyField,
      name_last: emptyField,
      tenants: emptyField,
      comment: emptyField,
      date_inquiry: emptyField,
      apartment: emptyField,
    };
    setValue(emptyForm);
    setInquiryInput({
      startDate: undefined,
      endDate: new Date(""),
      key: "selection",
    });
  };

  dates.length = 0;
  bookings.forEach((booking) => {
    const { startDate, endDate } = booking;
    let current = startDate || new Date();

    while (isBefore(current, addDays(endDate || current, 1))) {
      dates.push(current);
      current = addDays(current, 1);
    }
  });

  useEffect(() => {
    if (response && ref?.current && response === 200) {
      ref.current.close();
      clearForm();
      // toast("Inquiry sent successfully.");
    }
    return setResponse(null);
  }, [response]);

  const { startDate, endDate } = inquiryInput;

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <DateRange
          className="MyCalendar"
          onChange={handleDateChange}
          showMonthAndYearPickers={false}
          moveRangeOnFirstSelection={false}
          showDateDisplay={false}
          months={2}
          preventSnapRefocus={true}
          minDate={new Date()}
          maxDate={addDays(new Date(), 365 * 2)}
          dragSelectionEnabled={true}
          ranges={[inquiryInput]}
          rangeColors={["#07004d40"]}
          weekStartsOn={1}
          disabledDates={dates}
          direction="horizontal"
        />
        {(startDate &&
          startDate instanceof Date &&
          endDate &&
          endDate instanceof Date && (
            <>
              <div className="flex flex-row gap-4 flex-wrap">
                <TextInput
                  name="name_first"
                  value={value.name_first}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="First Name"
                  autoComplete="given-name"
                />
                <TextInput
                  name="name_last"
                  value={value.name_last}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Last Name"
                  autoComplete="family-name"
                />
              </div>

              <TextInput
                name="email"
                value={value.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="E-Mail"
                type="email"
                autoComplete="email"
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
                <div className="flex gap-4 justify-end">
                  <Button type="reset" onClick={clearForm}>
                    Reset
                  </Button>
                  <Button type="submit">Send your inquiry</Button>
                </div>
              </FormField>
            </>
          )) || (
          <div>
            To inquire about this apartment, please select your desired stay
            dates.
          </div>
        )}
      </form>
      <Dialog ref={ref}>
        <SendConfirmation
          value={value}
          handleChange={handleChange}
          setResponse={setResponse}
        />
      </Dialog>
    </>
  );
}
