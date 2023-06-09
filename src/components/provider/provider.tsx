"use client";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { store } from "@/store";

export function DataProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function NextThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
