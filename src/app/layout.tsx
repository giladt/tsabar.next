import "./globals.css";
import { type ReactNode } from "react";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { NextThemeProvider } from "@/components/provider/provider";
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import { DataProvider } from "@/components/provider/provider";
import Preloader from "@/components/preloader/preloader";
import { getData } from "@/utils/data-handlers";
import { IApartmentData } from "@/utils/types.d";

import { store } from "@/store";
import { setStartupApartments } from "@/store/apartmentSlice";
import apartmentsData from "@/assets/apartments.json";

const roboto = Roboto({ subsets: ["latin"], weight: "400", preload: true });

export const metadata = {
  title: "Le Petit Moabit",
  description:
    "Modern, fully renovated, all-inclusive apartments for rent in the heart of Berlin",
  icons: {
    icon: "./favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const apartments: IApartmentData[] = [];

  for (let apartment of apartmentsData) {
    const url = `https://www.airbnb.com/calendar/ical/${
      process.env["ICAL_ID_APT_" + apartment.id]
    }.ics?s=${process.env["ICAL_SECRET_APT_" + apartment.id]}`;
    const bookings = JSON.parse(JSON.stringify(await getData(url)));

    apartments.push({ ...apartment, bookings });
  }

  store.dispatch(setStartupApartments(apartments));

  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextThemeProvider>
          <Preloader apartments={apartments} />
          <DataProvider>
            <ThemeSwitcher />
            {children}
          </DataProvider>
          <Analytics />
        </NextThemeProvider>
      </body>
    </html>
  );
}
