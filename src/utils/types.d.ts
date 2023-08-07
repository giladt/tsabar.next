import * as ReactMdIcon from "react-icons/md";

export type TMdIcons = keyof typeof ReactMdIcon;

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

type TDateItem = { currentMonth: boolean, today: boolean, date: Dayjs, booked: boolean }

type TMonth = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December"

export const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// type TApartment = "Le Soleil" | "La Lune";
export type TApartments = [];

export interface IApartmentData {
  id: number;
  url: string;
  name: string;
  info: string;
  images: { id: string; description?: string }[];
  bookings: TBookings;
  tags?: { icon: TMdIcons, text: string }[];
}

export type TBooking = { start: Dayjs; end: Dayjs };
export type TBookings = {
  [year: string]: { [month: string]: TBooking[] }
};
