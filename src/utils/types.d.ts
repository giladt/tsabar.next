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

type TApartment = "Le Soleil" | "La Lune";
export type TApartments = TApartment[];

export type TBooking = { start: Dayjs; end: Dayjs };
export type TBookings = {
  [apartment: string]: { [year: string]: { [month: string]: TBooking[] } };
};

