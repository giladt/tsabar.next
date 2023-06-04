import dayjs, { type Dayjs } from "dayjs";
import { MONTHS, TApartment } from "@/utils/types.d";
import { TApartments, TBookings } from "@/utils/types.d";

export const getData = async (apartments: TApartments) => {
  try {
    const icalUrls: { [id: string]: string } = {
      "La Lune": `https://www.airbnb.com/calendar/ical/${process.env.ICAL_ID_APT_7}.ics?s=${process.env.ICAL_SECRET_APT_7}`,
      "Le Soleil": `https://www.airbnb.com/calendar/ical/${process.env.ICAL_ID_APT_4}.ics?s=${process.env.ICAL_SECRET_APT_4}`,
    };
    const parsedBookings: TBookings = {};
    for (let apartment of apartments) {
      const data = (await (await fetch(icalUrls[apartment])).text()).split(
        "\n"
      );

      const events = parseICalData(data);

      if (!events || !Object.entries(events).length) return {};
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
          if (!parsedBookings[apartment]) {
            parsedBookings[apartment] = {};
          }
          if (!parsedBookings[apartment][day.year()]) {
            parsedBookings[apartment][day.year()] = {};
          }
          if (!parsedBookings[apartment][day.year()][MONTHS[day.month()]]) {
            parsedBookings[apartment][day.year()][MONTHS[day.month()]] = [];
          }
          parsedBookings[apartment][day.year()][MONTHS[day.month()]].push({
            start: event.start.isAfter(firstDateOfMonth)
              ? event.start
              : firstDateOfMonth,
            end: event.end.isBefore(lastDateOfMonth)
              ? event.end
              : lastDateOfMonth,
          });

          day = day.add(1, "month");
        }
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

