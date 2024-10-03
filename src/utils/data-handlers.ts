import { Octokit } from "@octokit/core";
import { JSDOM } from "jsdom";
import { marked } from "marked";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import createDOMPurify from "dompurify";
import { RangeKeyDict } from "react-date-range";
import { subDays } from "date-fns";

export const getData = async (iCalURL: string): Promise<RangeKeyDict["bookings"][]> => {
  try {
    const res = await fetch(iCalURL, { next: { revalidate: 60 } });
    const data = await (res).text();
    const eventsStringArray = data.split("\n");
    if (!eventsStringArray.length) return [];
    const events = parseICalData(eventsStringArray);

    return events;
  } catch (err) {
    console.log({ err });
    return [];
  }
};

export const parseICalData = (data: string[]) => {
  const events: RangeKeyDict["bookings"][] = [];
  let isEvent: boolean = false;
  const event: RangeKeyDict["bookings"] = {
    startDate: undefined,
    endDate: new Date(""),
    key: "bookings"
  };

  if (!data?.length) return [];
  for (let lineIndex = 0; lineIndex < data.length; lineIndex++) {
    const line = data[lineIndex].trim();
    if (line.includes("BEGIN:VEVENT")) {
      isEvent = true;
    } else if (isEvent && line.includes("END:VEVENT")) {
      events.push(event);
      isEvent = false;
    } else if (line.includes("END:VCALENDAR")) {
      return events;
    } else if (isEvent) {
      const match = /(?<=DT)(.*)(?=;).*(?<=DATE:)(.*)(?=)/g.exec(line);

      if (!!match) {
        const [key, value]: string[] = match.slice(1);
        const [ year, month, day ] = [value.slice(0, 4), value.slice(4, 6), value.slice(6, 8)];
        if (key.toLowerCase() === "start") {
          event.startDate = new Date(`${year}-${month}-${day}`)
        } else {
          event.endDate = subDays(new Date(`${year}-${month}-${day}`), 1);
        }
      }
    }
  }

  throw new Error("Parsing calendar failed");
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
    if (Array.isArray(res)) return null;

    const { download_url } = res;

    if (!download_url)
      throw new Error(`Error: Failed to retrieve page content from '${fileName}'.`);

    const data = await fetch(download_url);
    const pageContent = await data.text();

    const window = new JSDOM("").window;
    const DOMPurify = createDOMPurify(window);
    const mdContent = await marked(pageContent)
    const sanitizedHtml = DOMPurify.sanitize(mdContent).replaceAll(
      /<a /g,
      `<a target="_blank" rel="noreferrer noopener nofollow" `
    );

    return { data: sanitizedHtml };
  } catch (error: unknown) {
    console.log({ error })
    throw new Error(`Error: '${fileName}' could not be fetched.`);
  }
};

