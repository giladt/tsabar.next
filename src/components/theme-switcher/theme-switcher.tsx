"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <span className="absolute top-2 right-2" aria-label="Switch color theme">
      {(currentTheme === "dark" && (
        <SunIcon
          className="w-7 h-7 text-gray-100"
          role="button"
          onClick={() => setTheme("light")}
        />
      )) || (
        <MoonIcon
          className="w-7 h-7 text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      )}
    </span>
  );
};
