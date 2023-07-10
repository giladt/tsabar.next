"use client";

import Link from "next/link";

import { getLocalStorage, setLocalStorage } from "@/utils/storage-helper";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";

    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });
      setLocalStorage("cookie_consent", cookieConsent);

      console.log("Cookie Consent: ", cookieConsent);
    }
  }, [cookieConsent]);

  return (
    <div
      className={`my-4 mx-2 md:mx-auto max-w md:max-w-screen-sm 
      fixed bottom-8 left-0 right-0 flex transition-transform duration-75
      ${
        cookieConsent != null ? "translate-y-56" : "translate-y-0"
      } px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4
      bg-gray-300 dark:bg-gray-700 rounded-lg shadow z-50 text-gray-200
    `}
    >
      <div className="text-center">
        <Link href="/imprint#privacy-statement">
          We use{" "}
          <span className="font-bold text-primary-light dark:text-primary-dark">
            cookies
          </span>{" "}
          on our site.
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          className="px-5 py-2 rounded-md 
            text-gray-700 dark:text-gray-300 
            hover:bg-tertiary-dark
            dark:hover:text-black"
          onClick={() => setCookieConsent(false)}
        >
          Decline
        </button>
        <button
          className="px-5 py-2 rounded-md 
          text-white bg-gray-500 
            hover:bg-primary-dark hover:text-black"
          onClick={() => setCookieConsent(true)}
        >
          Allow
        </button>
      </div>
    </div>
  );
}
