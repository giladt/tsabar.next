import { Metadata } from "next";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

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
};

function Imprint() {
  return (
    <main>
      <h1>Imprint</h1>
      <p>{process.env.IMPRINT_OWNER_NAME}</p>
      <p>{process.env.IMPRINT_HOME_ADDRESS}</p>
      <p>{process.env.IMPRINT_EMAIL_ADDRESS}</p>
      <br />
      <Link href="/" className="flex">
        <span
          className="flex items-center gap-2 border-b border-b-transparent border-dashed
        hover:border-b-gray-500"
        >
          <MdArrowBack />
          Back home
        </span>
      </Link>
    </main>
  );
}
export default Imprint;
