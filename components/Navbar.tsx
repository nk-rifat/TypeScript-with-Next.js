"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          DevDirectory
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">
          <Link
            href="/developers"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Developers
          </Link>
          <Link
            href="/register"
            className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Register
          </Link>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="text-xl cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}
