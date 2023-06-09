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

  if (!mounted)
    return (
      <button
        className="fixed top-2 right-2 p-1
      rounded-full z-10
      bg-white/50 dark:bg-black/50
      hover:bg-white/75 dark:hover:bg-black/75
      "
        disabled
        aria-label="Switch color theme"
      >
        <TbBulbOff className="w-7 h-7 text-black/50 dark:text-white/50" />
      </button>
    );

  return (
    <button
      className="fixed top-2 right-2 p-1
      rounded-full z-10
      bg-white/50 dark:bg-black/50
      hover:bg-white/75 dark:hover:bg-black/75
      "
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      aria-label="Switch color theme"
    >
      {currentTheme === "dark" && (
        <TbBulb className="w-7 h-7 text-white" role="button" />
      )}
      {currentTheme === "light" && (
        <TbBulbOff className="w-7 h-7 text-black" role="button" />
      )}
    </button>
  );
};
