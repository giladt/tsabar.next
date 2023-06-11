import "./globals.css";
import { type ReactNode } from "react";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { NextThemeProvider } from "@/components/provider/provider";
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import styles from "./layout.module.scss";
import Link from "next/link";

const roboto = Roboto({ subsets: ["latin"], weight: "400", preload: true });

export const metadata = {
  title: {
    default:
      "Le Petit Moabit - Furnished apartments for rent in the heart of Berlin Moabit",
    template: "%s | Le Petit Moabit",
  },
  description:
    "Need a place to stay in Berlin? Search no more! Furnished, fully-equipped, all-inclusive one-room apartments for rent in the heart of Berlin - Moabit.",
  creator: "Family Tsabar",
  keywords: [
    "rent",
    "apartment",
    "berlin",
    "bedroom",
    "mitte",
    "tiergarten",
    "furnished",
    "sleep",
    "wunderflats",
    "airbnb",
    "homelike",
  ],
  icons: {
    icon: "./favicon.ico",
  },
  generator: "Next.js",
  applicationName: "Next.js",
  referrer: "origin-when-cross-origin",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      </body>
    </html>
  );
}
