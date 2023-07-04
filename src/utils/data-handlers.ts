import dayjs from "dayjs";
import { DateRangeType } from "react-tailwindcss-datepicker/dist/types";

import { Octokit } from "@octokit/core";
import { JSDOM } from "jsdom";
import { marked } from "marked";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import createDOMPurify from "dompurify";


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

marked.use(mangle(), gfmHeadingId());

export const getMdFileData = async (fileName: string) => {
  try {
    const githubConfig = {
      type: "private",
      ref: process.env.GITHUB_CONTENT_BRANCH,
      token: process.env.GITHUB_CONTENT_TOKEN,
      owner: process.env.GITHUB_CONTENT_OWNER || "",
      repo: process.env.GITHUB_CONTENT_REPO || "",
    };

    const octokit = new Octokit({ auth: githubConfig.token });
    const res = (
      await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        ...githubConfig,
        path: fileName,
      })
    ).data;
    if (Array.isArray(res)) return;

    const { download_url } = res;

    if (!download_url)
      throw new Error(`Error: Failed to retrieve page content from '${fileName}'.`);

    const data = await fetch(download_url);
    const pageContent = await data.text();

    const window = new JSDOM("").window;
    const DOMPurify = createDOMPurify(window);
    const sanitizedHtml = DOMPurify.sanitize(marked(pageContent)).replaceAll(
      /<a /g,
      `<a target="_blank" rel="noreferrer noopener nofollow" `
    );

    return { data: sanitizedHtml };
  } catch (error: unknown) {
    throw new Error(`Error: '${fileName}' could not be fetched.`);
  }
};

