import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import styles from "./about.module.scss";

const fetchFromNotion = async () => {
  const res = await fetch("http://localhost:3000/api/notion", {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};

async function About() {
  const data = await fetchFromNotion();
  // const pageData = await getPageData(data, "about");
  console.log({ data });

  return (
    <div className={styles.about}>
      <Link href="/">
        <MdArrowBack />
        Back home
      </Link>
      <br />
      <main dangerouslySetInnerHTML={{ __html: data.data }} />
    </div>
  );
}
export default About;
