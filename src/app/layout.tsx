import { Suspense, type ReactNode } from "react";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { NextThemeProvider } from "@/components/provider/provider";
import GoogleAnalytics from "@/components/google/analytics";
import CookieBanner from "@/components/cookie-banner/cookie-banner";
import { Footer } from "@/components/footer/footer";
import { LinkBtn } from "@/components/button";
import Fonts from "@/utils/fonts";

import "./globals.css";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: {
    default:
      "🏠 Le Petit Moabit | Furnished apartments for rent in the heart of Berlin Moabit",
    template: "%s | Le Petit Moabit",
  },
  description:
    "Need a place to stay in Berlin? Search no more! Furnished, fully-equipped, all-inclusive one-room apartments for rent in the heart of Berlin - Moabit.",
  creator: "Family Tsabar",
  metadataBase: new URL("https://www.tsabar.net"),
  icons: {
    icon: "./favicon.ico",
  },
  applicationName: "Le Petit Moabit | Furnished Apartments Rental | Berlin, DE",
  referrer: "origin-when-cross-origin",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${Fonts.roboto.variable} ${Fonts.dancing.variable} ${Fonts.karla.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <Suspense
          fallback={
            <span className="absolute px-4 bottom-4 left-2 bg-black/50 rounded-md">
              Loading G-Analytics...
            </span>
          }
        >
          <GoogleAnalytics
            GA_MEASUREMENT_ID={`${process.env.GA_MEASUREMENT_ID}`}
          />
        </Suspense>
        <NextThemeProvider>
          <div
            className="flex flex-col justify-center
              font-karla text-base
              max-w-screen-md min-h-[calc(100svh-2rem)]
              m-auto mb-20
            "
          >
            <LinkBtn.ThemeSwitch />
            {children}
          </div>
          <Footer />
        </NextThemeProvider>
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
