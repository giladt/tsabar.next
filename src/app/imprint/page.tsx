import { Metadata } from "next";
import { MdHouse } from "react-icons/md";

import { LinkBtn } from "@/components/button";
import { getMdFileData } from "@/utils/data-handlers";

import styles from "./imprint.module.scss";

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
    <div className={styles.imprint}>
      <LinkBtn.NavigationIcon href="/">
        <MdHouse />
      </LinkBtn.NavigationIcon>

      <br />
      <main dangerouslySetInnerHTML={{ __html: data?.data || "" }} />
    </div>
  );
}
export default Imprint;
