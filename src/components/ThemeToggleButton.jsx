import { UseThemeContext } from "../Context/ThemeContext";

export default function ThemeToggleButton() {
  const { darkMode, toggleTheme  } = UseThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white transition"
    >
      {darkMode === "light" ? (
        <span className="material-symbols-outlined">dark_mode</span>
      ) : (
        <span className="material-symbols-outlined">light_mode</span>
      )}
    </button>
  );
}
