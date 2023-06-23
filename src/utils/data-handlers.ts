import dayjs, { type Dayjs } from "dayjs";
import { DateRangeType } from "react-tailwindcss-datepicker/dist/types";

export const getData = async (iCalURL: string): Promise<DateRangeType[]> => {
  try {
    const parsedBookings: DateRangeType[] = [];
    const res = await fetch(iCalURL, { next: { revalidate: 60 } })
    const data = await (res).text();
    const events = parseICalData(data.split("\n"));

    if (!events || !Object.entries(events).length) return [];
    if (events[0].start.isBefore(dayjs())) events[0].start = events[0].start.subtract(1, "month");

    for (let event of events) {
      if (!event || !event.start || !event.end) continue;

      parsedBookings.push({ startDate: event.start.toDate(), endDate: event.end.toDate() })
    }

    return parsedBookings;
  } catch (err) {
    console.log({ err });
    return [];
  }
};

export const parseICalData = (data: string[]) => {
  const events: { start: Dayjs; end: Dayjs }[] = [];
  let isEvent: boolean = false;
  let event: { start: Dayjs; end: Dayjs } = {
    start: dayjs(),
    end: dayjs(),
  };

  for (let lineIndex = 0; lineIndex < data.length; lineIndex++) {
    const line = data[lineIndex].trim();
    if (line.includes("BEGIN:VEVENT")) {
      isEvent = true;
    } else if (isEvent && line.includes("END:VEVENT")) {
      events.push(event);
      isEvent = false;
    } else if (isEvent) {
      const match = /(?<=DT)(.*)(?=;).*(?<=DATE:)(.*)(?=)/g.exec(line);

      if (match) {
        const [_, key, value]: string[] = match;

        const eventKey = key.toLowerCase() as "start" | "end";
        const eventValue = dayjs(value);

        event[eventKey] = eventValue;
      }
    }
  }

  return events;
};

