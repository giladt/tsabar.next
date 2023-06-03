import { TBookings } from "@/app/page";
import dayjs, { type Dayjs } from "dayjs";
import { TDateItem, Range, MONTHS } from "./types.d";

export const generateDate = (apartment: string, bookings: TBookings, month: Range<0, 11> = dayjs().month() as Range<0, 11>, year: number = dayjs().year()) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
  const arrayOfDate: TDateItem[] = [];

  if (!bookings[apartment] || Object.entries(!bookings[apartment]).length) return [];
  const isBooked = (currentDay: Dayjs): boolean => {
    const year = currentDay.year().toString();
    const month = currentDay.month() as Range<0, 11>;
    const day = currentDay.date();

    if (!bookings || !bookings[apartment] || !bookings[apartment][year] || !bookings[apartment][year][MONTHS[month]]) return false;
    const currentMonthBookings = bookings[apartment][year][MONTHS[month]];
    let isBooked = false;

    if (currentMonthBookings) {
      for (let { start, end } of currentMonthBookings) {
        if (day >= dayjs(start).date() && day <= dayjs(end).date()) {
          return isBooked = true;
        }
      }
    }

    return isBooked;
  }

  // create prefix dates
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const currentDay = firstDateOfMonth.day(i);
    arrayOfDate.push({
      currentMonth: false,
      today: currentDay.toDate().toDateString() === dayjs().toDate().toDateString(),
      date: firstDateOfMonth.day(i),
      booked: isBooked(currentDay)
    })
  }

  // generate month dates
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    const currentDay = firstDateOfMonth.date(i);
    arrayOfDate.push({
      currentMonth: true,
      today: currentDay.toDate().toDateString() === dayjs().toDate().toDateString(),
      date: currentDay,
      booked: isBooked(currentDay),
    });
  }

  // create suffix dates
  const remaining = 42 - arrayOfDate.length;
  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
    const currentDay = firstDateOfMonth.date(i);
    arrayOfDate.push({
      currentMonth: false,
      today: currentDay.toDate().toDateString() === dayjs().toDate().toDateString(),
      date: currentDay,
      booked: isBooked(currentDay),
    });
  }

  return arrayOfDate;
}