import "./globals.css";
import { type ReactNode } from "react";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { NextThemeProvider } from "@/components/provider/provider";
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <NextThemeProvider>
          <ThemeSwitcher />
          {children}
        </NextThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
