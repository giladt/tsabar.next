import { Client, isNotionClientError, APIErrorCode, ClientErrorCode } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NotionToMarkdown } from "notion-to-md";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { marked } from "marked";

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DB_ID;
const notionPageId = process.env.NOTION_PAGE_ID;

const notion = new Client({ auth: notionSecret });
const n2m = new NotionToMarkdown({ notionClient: notion });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!notionSecret || !notionDatabaseId || !notionPageId)
    throw new Error("NotionAPI: Missing or false credentials.");

  try {
    const mdBlocks = await n2m.pageToMarkdown(notionPageId);
    const mdString = n2m.toMarkdownString(mdBlocks);

    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window)
    const sanitizedParent = DOMPurify.sanitize(marked(mdString.parent));

    res.status(res.statusCode).json({ data: sanitizedParent })
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          console.log("408", error.cause);
          res.status(408).send("Request Timeout");
          break
        case APIErrorCode.ObjectNotFound:
          console.log("404", error.cause);
          res.status(408).send("Not Found");
          break
        case APIErrorCode.Unauthorized:
          console.log("401", error.cause);
          res.status(408).send("Unauthorized");
          break
        default:
          console.log("500", error.cause);
          res.status(500).send("Internal Server Error");
      }
    }
  }
}
