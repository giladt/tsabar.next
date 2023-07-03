import { Metadata } from "next";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Octokit } from "@octokit/core";
import { JSDOM } from "jsdom";
import { marked } from "marked";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import createDOMPurify from "dompurify";

import styles from "./imprint.module.scss";

export const revalidate = 0;
marked.use(mangle(), gfmHeadingId());

const fetchPageContent = async () => {
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
        path: "imprint.md",
      })
    ).data;
    if (Array.isArray(res)) return;

    const { download_url } = res;

    if (!download_url)
      throw new Error(`Error: Failed to retrieve page content.`);

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
    throw new Error("Error: About page content could not be fetched.");
  }
};

export const metadata: Metadata = {
  title: "Imprint",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      nocache: true,
    },
  },
  alternates: {
    canonical: "/imprint",
  },
};

async function Imprint() {
  const data = await fetchPageContent();

  return (
    <div className={styles.imprint}>
      <Link
        href="/"
        role="button"
        className="bg-black/25
        hover:bg-black/50
        text-black dark:text-white"
      >
        <MdArrowBack />
        Back home
      </Link>

      <br />
      <main dangerouslySetInnerHTML={{ __html: data?.data || "" }} />
    </div>
  );
}
export default Imprint;
