import { Metadata } from "next";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import styles from "./imprint.module.scss";

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
    <main className={styles.imprint}>
      <Link href="/" className="flex">
        <span
          className="flex items-center gap-2 border-b border-b-transparent border-dashed
        hover:border-b-gray-500"
        >
          <MdArrowBack />
          Back home
        </span>
      </Link>

      <br />

      <section>
        <h1>Imprint</h1>
        <p>{process.env.IMPRINT_OWNER_NAME}</p>
        <p>{process.env.IMPRINT_HOME_ADDRESS}</p>
        <p>{process.env.IMPRINT_EMAIL_ADDRESS}</p>
      </section>

      <br />

      <section id="privacy-statement" aria-label="cookies information">
        <h1>Privacy Statement</h1>

        <h2>Description of Service</h2>
        <p>
          This is a web analytics service. With this, the user can measure the
          advertising return on investment "ROI" as well as track user behavior
          with flash, video, websites and applications.
        </p>

        <h2>Processing Company</h2>
        <p>
          Google Ireland Limited Google Building Gordon House, <br />4 Barrow
          St, Dublin, D04 E5W5, Ireland
        </p>

        <h2>Data Protection Officer of Processing Company</h2>
        <p>
          Below you can find the email address of the data protection officer of
          the processing company.
          <br />
          <Link href="https://support.google.com/policies/contact/general_privacy_form">
            https://support.google.com/policies/contact/general_privacy_form
          </Link>
        </p>

        <h2>Data Purposes</h2>
        <p>
          This list represents the purposes of the data collection and
          processing.
        </p>
        <ul>
          <li>Marketing</li>
          <li>Analytics</li>
        </ul>

        <h2>Technologies Used</h2>
        <p>
          This list represents all technologies this service uses to collect
          data. Typical technologies are Cookies and Pixels that are placed in
          the browser.
        </p>
        <ul>
          <li>Cookies</li>
          <li>Pixel</li>
          <li>JavaScript</li>
          <li>Device fingerprinting</li>
        </ul>

        <h2>Data Collected</h2>
        <p>
          This list represents all (personal) data that is collected by or
          through the use of this service.
        </p>
        <ul>
          <li>Click path</li>
          <li>Date and time of visit</li>
          <li>Device information</li>
          <li>Location information</li>
          <li>IP address</li>
          <li>Pages visited</li>
          <li>Referrer URL</li>
          <li>Browser information</li>
          <li>Hostname</li>
          <li>Browser language</li>
          <li>Browser type</li>
          <li>Screen resolution</li>
          <li>Device operating system</li>
          <li>Interaction data</li>
          <li>User behavior</li>
          <li>Visited URL</li>
          <li>Cookie ID</li>
        </ul>

        <h2>Legal Basis</h2>
        <p>
          In the following the required legal basis for the processing of data
          is listed.
        </p>
        <ul>
          <li>Art. 6 para. 1 s. 1 lit. a GDPR</li>
        </ul>

        <h2>Location of Processing</h2>
        <p>
          This is the primary location where the collected data is being
          processed. If the data is also processed in other countries, you are
          informed separately.
        </p>
        <ul>
          <li>European Union</li>
        </ul>

        <h2>Retention Period</h2>
        <p>
          The retention period is the time span the collected data is saved for
          the processing purposes. The data needs to be deleted as soon as it is
          no longer needed for the stated processing purposes.
        </p>

        <h2>Transfer to Third Countries</h2>
        <p>
          This service may forward the collected data to a different country.
          Please note that this service might transfer the data to a country
          without the required data protection standards. If the data is
          transferred to the USA, there is a risk that your data can be
          processed by US authorities, for control and surveillance measures,
          possibly without legal remedies. Below you can find a list of
          countries to which the data is being transferred. For more information
          regarding safeguards please refer to the website provider’s privacy
          policy or contact the website provider directly.
        </p>
        <ul>
          <li>United States of America</li>
          <li>Singapore</li>
          <li>Chile</li>
          <li>Taiwan</li>
        </ul>

        <h2>Data Recipients</h2>
        <p>In the following the recipients of the data collected are listed.</p>
        <ul>
          <li>Google Ireland Limited, Alphabet Inc., Google LLC</li>
        </ul>

        <br />
        <p>
          Click{" "}
          <Link href="https://policies.google.com/privacy?hl=en">here</Link> to
          read the privacy policy of the data processor.
        </p>
        <p>
          Click{" "}
          <Link href="https://policies.google.com/technologies/cookies?hl=en">
            here
          </Link>{" "}
          to read the cookie policy of the data processor.
        </p>
        <p>
          Click{" "}
          <Link href="https://tools.google.com/dlpage/gaoptout?hl=de">
            here
          </Link>{" "}
          to opt out from this processor across all domains
        </p>
      </section>
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
