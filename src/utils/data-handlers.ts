import dayjs, { type Dayjs } from "dayjs";
import { DateRangeType } from "react-tailwindcss-datepicker/dist/types";

export const getData = async (iCalURL: string): Promise<DateRangeType[]> => {
  try {
    const res = await fetch(iCalURL, { next: { revalidate: 60 } });
    const data = await (res).text();
    const events = parseICalData(data.split("\n"));


    if (!events || !Object.entries(events).length) return [];

    const parsedBookings = events.map((event: DateRangeType) => {
      return { startDate: event.startDate, endDate: event.endDate };
    })

    return parsedBookings;
  } catch (err) {
    console.log({ err });
    return [];
  }
};

export const parseICalData = (data: string[]) => {
  const events: DateRangeType[] = [];
  let isEvent: boolean = false;
  let event: DateRangeType = {
    startDate: null,
    endDate: null,
  };

  for (let lineIndex = 0; lineIndex < data.length; lineIndex++) {
    const line = data[lineIndex].trim();
    if (line.includes("BEGIN:VEVENT")) {
      isEvent = true;
    } else if (isEvent && line.includes("END:VEVENT")) {
      events.push({ ...event });
      isEvent = false;
    } else if (isEvent) {
      const match = /(?<=DT)(.*)(?=;).*(?<=DATE:)(.*)(?=)/g.exec(line);

      if (match) {
        const [_, key, value]: string[] = match;

        key.toLowerCase() === "start"
          ? event.startDate = dayjs(value).toDate()
          : event.endDate = dayjs(value).subtract(1, "day").toDate();
      }
    }
  }

  return events;
};
