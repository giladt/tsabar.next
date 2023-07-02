import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import styles from "./about.module.scss";

import {
  Client,
  isNotionClientError,
  APIErrorCode,
  ClientErrorCode,
} from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { marked } from "marked";

const notionSecret = process.env.NOTION_SECRET;
const notionPageId = process.env.NOTION_PAGE_ID;

const notion = new Client({ auth: notionSecret });
const n2m = new NotionToMarkdown({ notionClient: notion });

const fetchFromNotion = async () => {
  if (!notionSecret || !notionPageId)
    throw new Error("NotionAPI: Missing or false credentials.");

  try {
    const mdBlocks = await n2m.pageToMarkdown(notionPageId);
    const mdString = n2m.toMarkdownString(mdBlocks);

    const window = new JSDOM("").window;
    const DOMPurify = createDOMPurify(window);
    const sanitizedParent = DOMPurify.sanitize(marked(mdString.parent));

    return { data: sanitizedParent };
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          console.log("408", error.cause);
          throw new Error("408: Request Timeout");
          break;
        case APIErrorCode.ObjectNotFound:
          console.log("404", error.cause);
          throw new Error("404: Not Found");
          break;
        case APIErrorCode.Unauthorized:
          console.log("401", error.cause);
          throw new Error("401: Unauthorized");
          break;
        default:
          console.log("500", error.cause);
          throw new Error("500: Internal Server Error");
      }
    }
  }
};

async function About() {
  const data = await fetchFromNotion();

  return (
    <div className={styles.about}>
      <Link href="/">
        <MdArrowBack />
        Back home
      </Link>
      <br />
      <main dangerouslySetInnerHTML={{ __html: data?.data || "" }} />
    </div>
  );
}
export default About;
