"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-maroon/20 dark:border-marigold/30 bg-ivory-soft dark:bg-charcoal-soft transition-colors hover:border-marigold"
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-marigold transition-transform group-hover:scale-110" strokeWidth={1.75} />
      ) : (
        <Sun className="h-4 w-4 text-maroon transition-transform group-hover:scale-110" strokeWidth={1.75} />
      )}
    </button>
  );
}
