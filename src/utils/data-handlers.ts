import dayjs, { type Dayjs } from "dayjs";
import { MONTHS } from "@/utils/types.d";
import { TBookings } from "@/utils/types.d";

export const getData = async (icalUrl: string) => {
  try {
    const parsedBookings: TBookings = {};
    const res = await fetch(icalUrl, { next: { revalidate: 60 } })
    const data = await (res).text();
    const events = parseICalData(data.split("\n"));

    console.log("GET-DATA:", { data });
    console.log("GET-DATA:", { events });

    if (!events || !Object.entries(events).length) return {};
    if (events[0].start.isBefore(dayjs())) events[0].start = events[0].start.subtract(1, "month");
    console.log("GET-DATA:", { firstEvent: events[0] });

    for (let event of events) {
      if (!event || !event.start || !event.end) continue;

      let day = event.start;
      while (day <= event.end) {
        const firstDateOfMonth = dayjs()
          .year(day.year())
          .month(day.month())
          .startOf("month");
        const lastDateOfMonth = dayjs()
          .year(day.year())
          .month(day.month())
          .endOf("month");

        console.log("GET-DATA:", { firstDateOfMonth, lastDateOfMonth });

        if (!parsedBookings[day.year()]) {
          parsedBookings[day.year()] = {};
        }
        if (!parsedBookings[day.year()][MONTHS[day.month()]]) {
          parsedBookings[day.year()][MONTHS[day.month()]] = [];
        }
        parsedBookings[day.year()][MONTHS[day.month()]].push({
          start: event.start.isAfter(firstDateOfMonth)
            ? event.start
            : firstDateOfMonth,
          end: event.end.isBefore(lastDateOfMonth)
            ? event.end
            : lastDateOfMonth,
        });
        console.log("GET-DATA:", { parsedBookings });

        console.log("GET-DATA:", { day });
        day = day.add(1, "month");
      }
    }

    return parsedBookings;
  } catch (err) {
    console.log({ err });
    return {};
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

        const eventKey = key.toLowerCase();
        const eventValue = dayjs(value);

        if (eventKey === "start") event.start = eventValue;
        if (eventKey === "end") event.end = eventValue;
      }
    }
  }

  return events;
};

