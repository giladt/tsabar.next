import { TBookings } from "@/utils/types.d";
import dayjs, { type Dayjs } from "dayjs";
import { TDateItem, Range, MONTHS } from "./types.d";

export const generateDate = (bookings: TBookings, month: Range<0, 11> = dayjs().month() as Range<0, 11>, year: number = dayjs().year()) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
  const arrayOfDate: TDateItem[] = [];

  if (!bookings || Object.entries(!bookings).length) return [];

  const isBooked = (currentDay: Dayjs): boolean => {
    const year = currentDay.year().toString();
    const month = currentDay.month() as Range<0, 11>;
    const day = currentDay.date();

    if (!bookings || !bookings[year] || !bookings[year][MONTHS[month]]) return false;
    const currentMonthBookings = bookings[year][MONTHS[month]];
    let isBooked = false;

    if (currentMonthBookings) {
      for (let { start, end } of currentMonthBookings) {
        if (currentDay.isSame(start) || currentDay.isSame(end) ||
          (currentDay.isAfter(start) && currentDay.isBefore(end))) {
          return isBooked = true;
        }
      }
    }

    return isBooked;
  }

  // create prefix dates
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);
    const booked = isBooked(date);
    const today = date.toDate().toDateString() === dayjs().toDate().toDateString();

    console.log("prefix:", { date: date.toISOString(), today, booked });

    arrayOfDate.push({
      currentMonth: false,
      today,
      date,
      booked
    })
  }

  // generate month dates
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    const date = firstDateOfMonth.date(i);
    const today = date.toDate().toDateString() === dayjs().toDate().toDateString();
    const booked = isBooked(date);

    console.log("month dates:", { date: date.toISOString(), today, booked });

    arrayOfDate.push({
      currentMonth: true,
      today,
      date: date,
      booked,
    });
  }

  // create suffix dates
  const remaining = 42 - arrayOfDate.length;
  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
    const date = firstDateOfMonth.date(i);
    const today = date.toDate().toDateString() === dayjs().toDate().toDateString();
    const booked = isBooked(date);

    console.log("suffix:", { date: date.toISOString(), today, booked });

    arrayOfDate.push({
      currentMonth: false,
      today,
      date: date,
      booked,
    });
  }

  return [...arrayOfDate];
}