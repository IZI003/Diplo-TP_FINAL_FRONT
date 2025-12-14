import { useState, useEffect,createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || "light";
  });
  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");

       localStorage.setItem("darkMode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");

       localStorage.setItem("darkMode", "light");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);

  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const UseThemeContext = () => useContext(ThemeContext);