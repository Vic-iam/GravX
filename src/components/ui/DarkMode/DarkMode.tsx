
import { useEffect, useState } from "react";

export default function DarkMode() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
        
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}