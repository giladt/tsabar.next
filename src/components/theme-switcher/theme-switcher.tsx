"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { TbBulb, TbBulbOff } from "react-icons/tb";

export const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <span className="fixed top-2 right-2" aria-label="Switch color theme">
      {(currentTheme === "dark" && (
        <TbBulb
          className="w-7 h-7 text-gray-100"
          role="button"
          onClick={() => setTheme("light")}
        />
      )) || (
        <TbBulbOff
          className="w-7 h-7 text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      )}
    </span>
  );
};
