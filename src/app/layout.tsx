import { type ReactNode } from "react";
import { Roboto } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

import { NextThemeProvider } from "@/components/provider/provider";
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import GoogleAnalytics from "@/components/google-analytics/google-analytics";
import CookieBanner from "@/components/cookie-banner/cookie-banner";

import styles from "./layout.module.scss";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: "400", preload: true });

export const metadata: Metadata = {
  title: {
    default:
      "Le Petit Moabit - Furnished apartments for rent in the heart of Berlin Moabit",
    template: "%s | Le Petit Moabit",
  },
  description:
    "Need a place to stay in Berlin? Search no more! Furnished, fully-equipped, all-inclusive one-room apartments for rent in the heart of Berlin - Moabit.",
  creator: "Family Tsabar",
  metadataBase: new URL("https://tsabar.net"),
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
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics GA_MEASUREMENT_ID={`${process.env.GA_MEASUREMENT_ID}`} />
      <body className={roboto.className}>
        <NextThemeProvider>
          <div className={styles.page}>
            <ThemeSwitcher />
            {children}
          </div>
          <footer className={styles.footer}>
            <div>
              <small>Made with 💓 in Berlin</small>
            </div>
            <div>
              <Link href="/imprint">Imprint</Link>
              {" | "}
              <small>© TSABAR.net 2023</small>
            </div>
          </footer>
        </NextThemeProvider>
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
