import { Metadata } from "next";
import { MdHouse } from "react-icons/md";

import { Button } from "@/components/button";
import { getMdFileData } from "@/utils/data-handlers";

import styles from "./about.module.scss";

export const revalidate = 60 * 60; // Revalidate all fetches once an hour;

export const metadata: Metadata = {
  title: "About",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      nocache: false,
    },
  },
  alternates: {
    canonical: "/about",
  },
};

async function About() {
  const data = await getMdFileData("about.md");

  return (
    <div className={styles.about}>
      <Button.Back href="/">
        <MdHouse />
      </Button.Back>

      <br />
      <main dangerouslySetInnerHTML={{ __html: data?.data || "" }} />
    </div>
  );
}
export default About;
