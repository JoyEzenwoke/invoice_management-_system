import { Link } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

const AppHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-white dark:bg-[#1E2139] shadow p-4 flex justify-between items-center">

      {/* TITLE */}
      <Link
        to="/"
        className="text-xl font-bold text-black dark:text-white"
      >
        Invoices
      </Link>

      {/* THEME TOGGLE */}
      <button
        onClick={toggleTheme}
        className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
      >
        {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

    </header>
  );
};

export default AppHeader;