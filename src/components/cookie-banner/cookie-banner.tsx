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

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setLocalStorage("cookie_consent", cookieConsent);

    console.log("Cookie Consent: ", cookieConsent);
  }, [cookieConsent]);

  return (
    <div
      className={`my-4 mx-2 md:mx-auto max-w md:max-w-screen-sm 
      fixed bottom-8 left-0 right-0 flex transition-transform duration-75
      ${
        cookieConsent != null ? "translate-y-56" : "translate-y-0"
      } px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4
      bg-gray-700 rounded-lg shadow text-gray-200
    `}
    >
      <div className="text-center">
        <Link href="/imprint#privacy-statement">
          <p>
            We use <span className="font-bold text-sky-400">cookies</span> on
            our site.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          className="px-5 py-2 text-gray-300 rounded-md 
            hover:bg-gray-800 hover:text-white hover:font-bold"
          onClick={() => setCookieConsent(false)}
        >
          Decline
        </button>
        <button
          className="px-5 py-2 text-white rounded-md bg-gray-900 
            hover:bg-gray-500 hover:font-bold"
          onClick={() => setCookieConsent(true)}
        >
          Allow
        </button>
      </div>
    </div>
  );
}
