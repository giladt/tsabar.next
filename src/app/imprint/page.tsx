import { Metadata } from "next";
import { MdHouse } from "react-icons/md";

import { LinkBtn } from "@/components/button";
import { getMdFileData } from "@/utils/data-handlers";

export const revalidate = 60 * 60; // Revalidate all fetches once an hour;

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
  const data = await getMdFileData("imprint.md");

  return (
    <div className="max-sm:p-4">
      <LinkBtn.NavigationIcon href="/">
        <MdHouse />
      </LinkBtn.NavigationIcon>

      <br />
      <main
        className="flex flex-col gap-2 mt-10
          prose prose-img:my-2
          prose-headings:mt-8 text-black dark:text-white
          prose-strong:font-bold prose-strong:text-inherit
          prose-ul:flex prose-ul:flex-wrap prose-ul:gap-2
          prose-ul:list-none prose-ul:p-0 prose-ul:m-0
          prose-li:rounded-md prose-li:outline-1 prose-li:outline-dashed prose-li:px-1
          prose-p:overflow-hidden prose-p:text-ellipsis prose-p:py-2 prose-p:m-0
          prose-a:no-underline
        "
        dangerouslySetInnerHTML={{ __html: data?.data || "" }}
      />
    </div>
  );
}
export default Imprint;
