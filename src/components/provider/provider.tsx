"use client";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { store } from "@/store";
import { useEffect, useState } from "react";

export function DataProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function NextThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <>{children}</>;

  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
